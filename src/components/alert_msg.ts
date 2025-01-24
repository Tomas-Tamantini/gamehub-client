import State from "../state";

export default class AlertMsgComponent {
    private alertMsgSpan = document.getElementById('alert-msg');

    public update(state: State) {
        if (this.alertMsgSpan) {
            this.alertMsgSpan.textContent = state.alertMsg ? state.alertMsg : '';
        }
    }

}