export const eventActions = {
  addEvent({ event, param }: { event: string; param: any }) {
    // @ts-ignore
    this.curComponent.events[event] = param
  },
  removeEvent(event: string) {
    // @ts-ignore
    delete this.curComponent.events[event]
  },
}
