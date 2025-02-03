import { Card } from "./card";
import GameService from "./game_service";
import {
    ErrorPayload,
    GameRoomPayload,
    GameRoomsResponsePayload,
    Message,
    PrivateView,
    PrivateViewPayload,
    SharedViewPayload
} from "./message";
import { SharedGameState } from "./state";
import StateStore from "./state_store";

export default class MessageHandler {
    constructor(private stateStore: StateStore, private gameService: GameService) { }

    handle(message: Message) {
        if (message.messageType === "ERROR") {
            this.handleErrorMessage(message.payload as ErrorPayload);
        }
        else if (message.messageType == "GAME_ROOMS") {
            this.handleRoomsResponse(message.payload as GameRoomsResponsePayload);
        }
        else if (message.messageType === "GAME_ROOM_UPDATE") {
            this.handleRoomUpdate(message.payload as GameRoomPayload);
        }
        else if (message.messageType === "GAME_STATE") {
            if (message.payload.sharedView) {
                const payload = message.payload as SharedViewPayload;
                this.handleSharedGameState(payload.sharedView);
            }
            else if (message.payload.privateView) {
                const payload = message.payload as PrivateViewPayload;
                this.handlePrivateGameState(payload.privateView);
            }
        }
        else {
            console.error(`Unknown message type: ${message.messageType}: ${JSON.stringify(message.payload)}`);
        }
    }

    private handleRoomUpdate(payload: GameRoomPayload) {
        const roomId = payload.roomId;
        const offlinePlayers = payload.offlinePlayers;
        let alertMsg = "";
        if (!this.stateStore.getState().sharedGameState) {
            alertMsg = `Players in room: ${payload.playerIds.join(", ")}`;
        }
        else if (offlinePlayers.length > 0) {
            alertMsg = `Offline players: ${offlinePlayers.join(", ")}`;
        }
        this.stateStore.update((state) => ({ ...state, alertMsg, offlinePlayers, roomId }));
    }

    private handleErrorMessage(payload: ErrorPayload) {
        this.stateStore.update((state) => ({ ...state, alertMsg: `Error: ${payload.error}`, selectedCards: [] }));
    }

    private handleSharedGameState(sharedGameState: SharedGameState) {
        let alertMsg: string | undefined = undefined;
        if (sharedGameState.result) {
            alertMsg = `Game over. Results: ${sharedGameState.result?.players.map(p => `${p.playerId}: ${p.distToAvg}`).join(' / ')}`;
        }
        const myCards = sharedGameState.status == "UPDATE_POINTS" ? [] : this.stateStore.getState().myCards;
        this.stateStore.update((state) => ({ ...state, sharedGameState, alertMsg, myCards }));
    }

    private handlePrivateGameState(privateView: PrivateView) {
        const serverCards = privateView.cards;
        const previousCards = this.stateStore.getState().myCards || [];
        const sortedCards = serverCards.sort((a, b) => cardIndex(previousCards, a) - cardIndex(previousCards, b));
        this.stateStore.update((state) => ({ ...state, myCards: sortedCards, alertMsg: undefined, selectedCards: [] }));
    }

    private handleRoomsResponse(payload: GameRoomsResponsePayload) {
        const nonFullRooms = payload.rooms.filter(room => room.playerIds.length < 4);
        if (nonFullRooms.length === 0) {
            // TODO: Implement
        }
        else {
            nonFullRooms.sort((a, b) => b.playerIds.length - a.playerIds.length);
            const roomId = nonFullRooms[0].roomId;
            this.gameService.joinGameById(roomId);
        }
    }
}

function cardIndex(cards: Card[], card: Card) {
    return cards.findIndex(c => c.rank === card.rank && c.suit === card.suit);
}