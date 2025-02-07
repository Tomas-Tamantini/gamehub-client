import MessageHandler from '../src/message_handler';
import StateStore from '../src/state_store';
import { GameStatus, GlobalState, SharedGameState } from '../src/state';
import GameService from '../src/game_service';


describe('MessageHandler', () => {
    let stateStore: StateStore;
    let messageHandler: MessageHandler;
    const initialState: GlobalState = { playerId: 'Alice', alertMsg: "Message" };
    const gameServiceSpy: jest.Mocked<GameService> = {
        joinGameById: jest.fn(),
        rejoinGame: jest.fn()
    } as unknown as jest.Mocked<GameService>;

    beforeEach(() => {
        stateStore = new StateStore();
        stateStore.update(() => initialState);
        messageHandler = new MessageHandler(stateStore, gameServiceSpy);
    });

    describe('handle GAME_ROOM_UPDATE message when player joined', () => {
        let updatedState: GlobalState;

        beforeEach(() => {
            const payload = { playerIds: ['player1', 'player2'], roomId: 123 };
            messageHandler.handle({ messageType: 'GAME_ROOM_UPDATE', payload });
            updatedState = stateStore.getState();
        });

        it('should update state room id', () => {
            expect(updatedState.roomId).toEqual(123);
        });

        it('should update alert message', () => {
            expect(updatedState.alertMsg).toEqual('Players in room: player1, player2');
        });

        it('should preserve rest of the state', () => {
            expect(updatedState.playerId).toEqual('Alice');
        });
    });

    describe('handle GAME_ROOM_UPDATE when player disconnected message before game start', () => {
        let updatedState: GlobalState;

        beforeEach(() => {
            const payload = { playerIds: ['player1', 'player2'] };
            messageHandler.handle({ messageType: 'GAME_ROOM_UPDATE', payload });
            updatedState = stateStore.getState();
        });

        it('should update alert message', () => {
            expect(updatedState.alertMsg).toEqual('Players in room: player1, player2');
        });


        it('should preserve rest of the state', () => {
            expect(updatedState.playerId).toEqual('Alice');
        });
    });

    describe('handle GAME_ROOM_UPDATE message when player disconnected after game start', () => {
        let updatedState: GlobalState;

        beforeEach(() => {
            const sharedGameState = { status: GameStatus.START_GAME } as SharedGameState
            stateStore.update(() => ({ ...initialState, sharedGameState }));
            const payload = { offlinePlayers: ['player3'] };
            messageHandler.handle({ messageType: 'GAME_ROOM_UPDATE', payload });
            updatedState = stateStore.getState();
        });

        it('should update alert message', () => {
            expect(updatedState.alertMsg).toEqual('Offline players: player3');
        });

        it('should update offline players', () => {
            expect(updatedState.offlinePlayers).toEqual(['player3']);
        })


        it('should preserve rest of the state', () => {
            expect(updatedState.playerId).toEqual('Alice');
        });
    });

    describe('handle ERROR message', () => {
        it('should update alert message', () => {
            const payload = { error: 'Some error' };
            messageHandler.handle({ messageType: 'ERROR', payload });
            const updatedState = stateStore.getState();
            expect(updatedState.alertMsg).toEqual('Error: Some error');
        });
    });

    describe('handle GAME_STATE message', () => {
        it('should reset status message', () => {
            const payload = {
                roomId: 123,
                sharedView: { status: "START_GAME" }
            }
            messageHandler.handle({ messageType: 'GAME_STATE', payload });
            const updatedState = stateStore.getState();
            expect(updatedState.alertMsg).toEqual(undefined);
        })

        it('should update shared game state', () => {
            const payload = {
                roomId: 123,
                sharedView: { status: "START_GAME" }
            }
            messageHandler.handle({ messageType: 'GAME_STATE', payload });
            const updatedState = stateStore.getState();
            expect(updatedState.sharedGameState).toEqual(payload.sharedView);
        })

        it('should update private game state', () => {
            const cards = [{ rank: '3', suit: 'd' }];
            const payload = {
                roomId: 123,
                privateView: { status: "DEAL_CARDS", cards }
            }
            messageHandler.handle({ messageType: 'GAME_STATE', payload });
            const updatedState = stateStore.getState();
            expect(updatedState.myCards).toEqual(cards);
        })
    });
});
