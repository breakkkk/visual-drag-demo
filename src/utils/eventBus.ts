class EventBus {
  events: Record<string, Function[]>
  constructor() {
    this.events = {};
  }
  on(event: string, callback: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  off(event: string, callback: Function) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }
  emit(event: string, ...args: any[]) {
    if (!this.events[event]) return;
    this.events[event].forEach(cb => cb(...args));
  }
  $on(event: string, callback: Function) { this.on(event, callback) }
  $off(event: string, callback: Function) { this.off(event, callback) }
  $emit(event: string, ...args: any[]) { this.emit(event, ...args) }
}
export default new EventBus();
