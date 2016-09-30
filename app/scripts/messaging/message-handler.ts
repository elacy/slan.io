/// <reference path="message.ts" />
/// <reference path="router.ts" />
/// <reference path="send.ts" />
/// <reference path="receive.ts" />
/// <reference path="message-extender.ts"/>
class MessageHandler {
  router: Router;

  constructor(router: Router){
    this.router = router;
    router.register(this);
  }

  routeSend(message:Message){
    this.router.route(new Send<Message>(message));
  }

  routeRecieve(message: Message){
    this.router.route(new Receive<Message>(message));
  }

  handle(message: Message){
    var type = message.type;

    if(message.hasOwnProperty("extension")){
      var extender = <MessageExtender<Message>> message;
      message = extender.message;
    }

    if(this[`handle${type}`]){
      this[`handle${type}`](message);
    }
  }
}
