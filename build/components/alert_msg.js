export default class AlertMsgComponent {
    constructor() {
        this.alertMsgSpan = document.getElementById('alert-msg');
    }
    update(state) {
        if (this.alertMsgSpan) {
            this.alertMsgSpan.textContent = state.alertMsg ? state.alertMsg : '';
        }
    }
}
