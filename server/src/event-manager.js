const EventEmitter = require('events');

class EventManager {
    constructor(){
        if(!EventManager.instance){
            EventEmitter.instance = new EventEmitter();
        }
    }

     // eslint-disable-next-line class-methods-use-this
    getInstance() {
        return EventManager.instance;
    }
}

module.exports = new EventEmitter();