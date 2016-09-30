/// <reference path="message.ts" />
class MessageExtender<T extends Message> extends Message {
  message: T;
  extension: string;

  constructor(message: T){
    super();

    this.message = message;
    this.extension = this.type;
    this.type = `${this.extension}${message.type}`;
  }
}
