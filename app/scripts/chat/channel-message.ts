/// <reference path="../messaging/message.ts" />
class ChannelMessage extends Message {
  text: string;

  constructor(text:string){
    super();

    this.text = text;
  }
}
