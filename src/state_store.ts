import State from "./state";

interface Subscriber {
    update: (state: State) => void;
}

export default class StateStore {
    private state: State = {};
    private subscribers: Subscriber[] = [];

    subscribe(subscriber: Subscriber) {
        this.subscribers.push(subscriber);
        subscriber.update(this.state);
    }

    update(updateFn: (state: State) => State) {
        this.state = updateFn(this.state);
        console.log(this.state);
        this.subscribers.forEach(subscriber => subscriber.update(this.state));
    }
}