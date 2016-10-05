/// <reference path="../../../bower_components/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../../bower_components/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../../bower_components/DefinitelyTyped/socket.io-client/socket.io-client.d.ts" />
/// <reference path="messaging/message-handler.ts" />
/// <reference path="crypt.ts" />

class ChatClient extends MessageHandler{
  socket: SocketIOClient.Socket;

  constructor(router: Router){
    super(router);

    this.socket = io();
    this.socket.on('channel message', (m)=>this.messageReceived(m));
  }

  messageReceived(encryptedString){
    this.routeRecieve(new ChannelMessage(encryptedString));
  }

  handleSendChannelMessage(message: ChannelMessage){
    this.socket.emit('channel message', message.text);
  }
}
