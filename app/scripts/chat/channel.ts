/// <reference path="../../../bower_components/DefinitelyTyped/knockout/knockout.d.ts" />
/// <reference path="chat-message.ts" />
/// <reference path="../messaging/send.ts" />
/// <reference path="../messaging/message-handler.ts" />
/// <reference path="channel-message.ts" />
/// <reference path="username-change.ts" />
/// <reference path="../crypt.ts" />
class Channel extends MessageHandler {
  channelCrypt: Crypt;
  username: string;

  constructor(router: Router, key?: string){
    super(router);
    this.channelCrypt = new Crypt(key);
  }

  handleSendChatMessage(message: ChatMessage){
    message.user = this.username;
    this.sendChannelMessage(message);
  }

  handleSendUsernameChange(message: UsernameChange){
    this.username = message.newName;
    this.sendChannelMessage(message);
  }

  handleReceiveUsernameChange(message: UsernameChange){
    if(message.oldName){
      this.routeRecieve(new ChatMessage(`Changed username to ${message.newName}`, message.oldName));
    }
    else{
      this.routeRecieve(new ChatMessage(`Joined`, message.newName));
    }
  }

  handleReceiveChannelMessage(message: ChannelMessage){
    var json = this.channelCrypt.decrypt(message.text);
    var decryptedMessage = JSON.parse(json);

    this.routeRecieve(decryptedMessage);
  }

  sendChannelMessage(message: Message){
    var json = JSON.stringify(message);
    var encrypted = this.channelCrypt.encrypt(json);

    var channelMessage = new ChannelMessage(encrypted);
    this.routeSend(channelMessage);
  }
}
