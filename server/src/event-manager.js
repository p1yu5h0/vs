const { EventEmitter } = require('events');

class EventManager {
    constructor(){
        if(!EventManager.instance){
            this.eventEmitter = new EventEmitter();
            EventManager.instance = this;
        }
    }

    static getInstance() {
        if (!EventManager.instance) {
            EventManager.instance = new EventManager();
        }
        return EventManager.instance.eventEmitter;
    }
}

module.exports = EventManager;