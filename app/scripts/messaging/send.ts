/// <reference path="message.ts" />
/// <reference path="message-extender.ts"/>
class Send<T extends Message> extends MessageExtender<T> {
  message: T;

  constructor(message: T){
    super(message);
  }
}
