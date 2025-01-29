import { GlobalState } from "../state";

// TODO: Make message like a pop-up, covering the game-area component instead of reducing its height
export default class AlertMsgComponent {
    private alertMsgSpan = document.getElementById('alert-msg');

    public update(state: GlobalState) {
        if (this.alertMsgSpan) {
            this.alertMsgSpan.textContent = state.alertMsg ? state.alertMsg : '';
        }
    }
}