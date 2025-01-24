import Message from "./message";

export default class MessageHandler {
    handle(message: Message) {
        if (message.messageType === "PLAYER_JOINED") {
            console.log(message.payload);
        }
    }
}