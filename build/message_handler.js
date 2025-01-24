export default class MessageHandler {
    handle(message) {
        if (message.messageType === "PLAYER_JOINED") {
            console.log(message.payload);
        }
    }
}
