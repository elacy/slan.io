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
    if(this["handle" + message.type]){
      this["handle" + message.type](message);
    }
  }
}
