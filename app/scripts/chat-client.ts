/// <reference path="../../bower_components/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/socket.io-client/socket.io-client.d.ts" />
/// <reference path="messaging/message-handler.ts" />
/// <reference path="crypt.ts" />

class ChatClient extends MessageHandler{
  socket: SocketIOClient.Socket;
  channelCrypt: Crypt;

  constructor(router: Router, channelCrypt: Crypt){
    super(router);

    this.channelCrypt = channelCrypt;

    this.socket = io();
    this.socket.on('chat message', this.messageReceived);
  }

  messageReceived(encryptedString){
    var decryptedString = this.channelCrypt.decrypt(encryptedString);
    var chatMessage = new ChatMessage("User", decryptedString);
    this.send(chatMessage);
  }

  handleSendChatMessage(message: SendChatMessage){
    var encryptedString = this.channelCrypt.encrypt(message.text);
    this.socket.emit('chat message', encryptedString)
  }
}
