/// <reference path="../../../bower_components/DefinitelyTyped/knockout/knockout.d.ts" />
/// <reference path="../chat/chat-message.ts" />
/// <reference path="../chat/send-chat-message.ts" />
/// <reference path="../messaging/message-handler.ts" />
class ChatView extends MessageHandler {
  messages = ko.observableArray<ChatMessage>();
  sendMessageText = ko.observable<string>();

  constructor(router: Router){
    super(router);
  }

  sendMessage(){
    this.send(new SendChatMessage("User", this.sendMessageText()));
    this.sendMessageText('');
  }

  handleChatMessage(message: ChatMessage){
    this.messages.push(message);
  }

}
