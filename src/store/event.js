export const eventActions = {
  addEvent({ event, param }) {
    this.curComponent.events[event] = param
  },
  removeEvent(event) {
    delete this.curComponent.events[event]
  },
}
