import { GameRoomPayload } from "./message";

export function roomToJoin(rooms: GameRoomPayload[]): GameRoomPayload | undefined {
    const nonFullRooms = rooms.filter(room => !room.isFull);
    if (nonFullRooms.length > 0) {
        nonFullRooms.sort((a, b) => b.playerIds.length - a.playerIds.length);
        return nonFullRooms[0];
    }
}


export function roomToRejoin(playerId: string | undefined, rooms: GameRoomPayload[]): GameRoomPayload | undefined {
    if (playerId) return rooms.find(room => room.offlinePlayers.includes(playerId));
}