/// <reference path="../messaging/message.ts" />
class SendChatMessage extends Message {
  user: string;
  text: string;

  constructor(user: string, text:string){
    super();

    this.user = user;
    this.text = text;
  }
}
