import { GlobalState } from "../state";

export default class AlertMsgComponent {
    private alertMsgSpan = document.getElementById('alert-msg');

    public update(state: GlobalState) {
        if (this.alertMsgSpan) {
            this.alertMsgSpan.textContent = state.alertMsg ? state.alertMsg : '';
        }
    }

}