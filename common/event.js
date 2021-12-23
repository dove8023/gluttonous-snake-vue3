/*
 * @Author: xisen.he 
 * @Date: 2021-12-20 10:37:28 
 * @Last Modified by: xisen.he
 * @Last Modified time: 2021-12-20 14:46:53
 */

export default class Event {
    constructor() {
        this.store = new Map();
    }

    on(eventName, callback) {
        if (!this.store.has(eventName)) {
            this.store.set(eventName, []);
        }

        if (typeof callback != "function") {
            throw new Error("Event callback must be a function")
        }

        this.store.get(eventName).push(callback);
    }

    emit(eventName, ...args) {
        let callbacks = this.store.get(eventName);
        if (!callbacks) {
            return;
        }

        for (let callback of callbacks) {
            callback(...args);
        }
    }
}