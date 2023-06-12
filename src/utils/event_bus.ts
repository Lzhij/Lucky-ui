type EventFnType = (...args: any[]) => any

type EventMapType = {
  [props: string | number]: EventFnType
}

class EventBus {
  protected eventMap: EventMapType = {};

  public on(eventName: string, fn: EventFnType) {
    this.eventMap[eventName] = fn;
  }

  public emit<T extends any[]>(eventName: string, ...args: T) {
    this.eventMap[eventName]?.(...args);
  }

  public off(eventName: string) {
    delete this.eventMap[eventName];
  }
}

export default new EventBus();
