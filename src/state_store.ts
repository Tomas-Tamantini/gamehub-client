import { GlobalState } from "./state";

interface Subscriber {
    update: (state: GlobalState) => void;
}

export default class StateStore {
    private state: GlobalState = {};
    private subscribers: Subscriber[] = [];

    subscribe(subscriber: Subscriber) {
        this.subscribers.push(subscriber);
        subscriber.update(this.state);
    }

    update(updateFn: (state: GlobalState) => GlobalState) {
        this.state = updateFn(this.state);
        this.subscribers.forEach(subscriber => subscriber.update(this.state));
    }

    getState() {
        return this.state;
    }
}