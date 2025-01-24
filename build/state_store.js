export default class StateStore {
    constructor() {
        this.state = {};
        this.subscribers = [];
    }
    subscribe(subscriber) {
        this.subscribers.push(subscriber);
        subscriber.update(this.state);
    }
    update(updateFn) {
        this.state = updateFn(this.state);
        this.subscribers.forEach(subscriber => subscriber.update(this.state));
    }
    getState() {
        return this.state;
    }
}
