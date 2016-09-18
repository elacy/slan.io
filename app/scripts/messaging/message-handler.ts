/// <reference path="message.ts" />
/// <reference path="router.ts" />
class MessageHandler {
  router: Router;

  constructor(router: Router){
    this.router = router;
    router.register(this);
  }

  send (message: Message){
    this.router.route(message);
  }

  handle(message: Message){
    var func = this["handle" + message.type];

    if(func){
      func(message);
    }
  }
}
