import MessageHandler from '../src/message_handler';
import StateStore from '../src/state_store';
import { GlobalState } from '../src/state';

describe('MessageHandler', () => {
    let stateStore: StateStore;
    let messageHandler: MessageHandler;
    const initialState: GlobalState = { playerId: 'Alice' };

    beforeEach(() => {
        stateStore = new StateStore();
        stateStore.update(() => (initialState));
        messageHandler = new MessageHandler(stateStore);
    });

    describe('handle PLAYER_JOINED message', () => {
        let updatedState: GlobalState;

        beforeEach(() => {
            const payload = {
                playerIds: ['player1', 'player2'],
                roomId: 123,
            };
            messageHandler.handle({ messageType: 'PLAYER_JOINED', payload });
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

    describe('handle ERROR message', () => {
        it('should update alert message', () => {
            const payload = { error: 'Some error' };
            messageHandler.handle({ messageType: 'ERROR', payload });
            const updatedState = stateStore.getState();
            expect(updatedState.alertMsg).toEqual('Error: Some error');
        });
    });

    describe('handle GAME_STATE message', () => {
        it('should update shared game state', () => {
            const payload = {
                roomId: 123,
                sharedView: { status: "START_GAME" }
            }
            messageHandler.handle({ messageType: 'GAME_STATE', payload });
            const updatedState = stateStore.getState();
            expect(updatedState.sharedGameState).toEqual(payload.sharedView);
        })
    });
});
