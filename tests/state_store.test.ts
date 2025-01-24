import StateStore from "../src/state_store"

describe("StateStore", () => {
    let stateStore: StateStore;

    beforeEach(() => {
        stateStore = new StateStore();
        stateStore.update(() => ({ playerId: "Alice" }));
    });

    it("should expose current state", () => {
        expect(stateStore.getState()).toEqual({ playerId: "Alice" });
    });

    it("should notify a subscriber with the current state upon subscription", () => {
        const mockSubscriber = { update: jest.fn() };
        stateStore.subscribe(mockSubscriber);

        expect(mockSubscriber.update).toHaveBeenCalledTimes(1);
        expect(mockSubscriber.update).toHaveBeenCalledWith({ playerId: "Alice" });
    });

    it("should notify all subscribers when the state is updated", () => {
        const subscriber1 = { update: jest.fn() };
        const subscriber2 = { update: jest.fn() };
        stateStore.subscribe(subscriber1);
        stateStore.subscribe(subscriber2);
        stateStore.update((state) => ({ playerId: `${state.playerId} and Bob` }));

        expect(subscriber1.update).toHaveBeenCalledTimes(2);
        expect(subscriber1.update).toHaveBeenCalledWith({ playerId: "Alice and Bob" });
        expect(subscriber2.update).toHaveBeenCalledTimes(2);
        expect(subscriber2.update).toHaveBeenCalledWith({ playerId: "Alice and Bob" });
    });
});
