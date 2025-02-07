import { GameRoomPayload } from "../src/message";
import { roomToJoin, roomToRejoin } from "../src/room_picker";

describe('roomPicker', () => {
    describe('roomToJoin', () => {
        it('should return undefined when all rooms are full', () => {
            const rooms = [{ isFull: true, playerIds: ['player1', 'player2'] }];
            expect(roomToJoin(rooms as GameRoomPayload[])).toBeUndefined();
        });

        it('should return room with most players when there are non full rooms', () => {
            const rooms = [
                { isFull: false, playerIds: ['player1'] },
                { isFull: false, playerIds: ['player2', 'player3'] }
            ];
            expect(roomToJoin(rooms as GameRoomPayload[])).toEqual({ isFull: false, playerIds: ['player2', 'player3'] });
        });
    })

    describe('roomToRejoin', () => {
        it('should return undefined when player is not offline in any room', () => {
            const rooms = [{ offlinePlayers: ['player1'] }];
            expect(roomToRejoin('player2', rooms as GameRoomPayload[])).toBeUndefined();
        });

        it('should return room where player is offline', () => {
            const rooms = [
                { offlinePlayers: ['player1'] },
                { offlinePlayers: ['player2', 'player3'] }
            ];
            expect(roomToRejoin('player2', rooms as GameRoomPayload[])).toEqual({ offlinePlayers: ['player2', 'player3'] });
        });
    })
})
