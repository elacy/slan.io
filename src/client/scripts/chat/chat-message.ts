/// <reference path="../messaging/message.ts" />
class ChatMessage extends Message {
  user: string;
  text: string;

  constructor(text:string, user?: string){
    super();

    this.user = user;
    this.text = text;
  }
}
