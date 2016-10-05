/// <reference path="../../../../bower_components/DefinitelyTyped/knockout/knockout.d.ts" />
/// <reference path="../chat/chat-message.ts" />
/// <reference path="../messaging/message-handler.ts" />
/// <reference path="../messaging/receive.ts" />
/// <reference path="../../typescript-definitions/jquery-nicescroll.d.ts" />
class ChatView extends MessageHandler {
  messages = ko.observableArray<ChatMessage>();
  sendMessageText = ko.observable<string>();

  constructor(router: Router){
    super(router);
  }

  sendMessage(){
    this.routeSend(new ChatMessage(this.sendMessageText()));
    this.sendMessageText('');
  }

  handleReceiveChatMessage(message: ChatMessage){
    this.messages.push(message);
  }
}
