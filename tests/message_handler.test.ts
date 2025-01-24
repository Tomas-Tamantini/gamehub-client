import MessageHandler from '../src/message_handler';
import StateStore from '../src/state_store';
import { Message, PlayerJoinedPayload } from '../src/message';
import State from '../src/state';

describe('MessageHandler', () => {
    let stateStore: StateStore;
    let messageHandler: MessageHandler;
    const initialState: State = { playerId: 'Alice' };

    beforeEach(() => {
        stateStore = new StateStore();
        stateStore.update(() => (initialState));
        messageHandler = new MessageHandler(stateStore);
    });

    describe('handle PLAYER_JOINED message', () => {
        let updatedState: State;

        beforeEach(() => {
            const payload: PlayerJoinedPayload = {
                playerIds: ['player1', 'player2'],
                roomId: 123,
            };
            const message: Message = {
                messageType: 'PLAYER_JOINED',
                payload,
            };

            messageHandler.handle(message);
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

});
