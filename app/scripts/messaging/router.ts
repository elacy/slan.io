/// <reference path="message-handler.ts"/>
/// <reference path="send.ts"/>
/// <reference path="send.ts"/>
class Router{
  handlers: Array<MessageHandler> = new Array<MessageHandler>();

  register(handler: MessageHandler): void{
    this.handlers.push(handler);
  }

  route(message: Message): void{
    for(var i = 0; i < this.handlers.length; i++){
      this.handlers[i].handle(message);
    }
  }
}
