class EventBus {
  constructor() {
    this.events = {};
  }
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }
  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(cb => cb(...args));
  }
  $on(event, callback) { this.on(event, callback) }
  $off(event, callback) { this.off(event, callback) }
  $emit(event, ...args) { this.emit(event, ...args) }
}
export default new EventBus();
