import { isObject } from './utils'

class Event {
  constructor () {
    this.events = {};
  }
}

Event.prototype.on = function (type, fun) {
  if (!this.events[type]) { this.events[type] = []; }
  if (this.events[type].indexOf(fun) === -1) {
    this.events[type].push(fun);
    return {
      index: this.events[type].length - 1,
      type
    }
  }
}

Event.prototype.emit = function (type, ...args) {
  const curEvent = this.events[type];
  if (!curEvent) { return; }
  for (let x = 0; x < curEvent.length; x++) {
    curEvent[x](args);
  } 
}

Event.prototype.remove = function (event) {
  if (!isObject(event)) { return; }
  this.events[event.type].splice(event.index, 1);
}

Event.prototype.removeEvent = function (type, event) {
  const index = this.events[type].indexOf(event);
  if (index === -1) { return; }
  this.events[type].splice(index, 1);
}