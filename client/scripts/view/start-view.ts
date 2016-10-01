/// <reference path="../../../bower_components/DefinitelyTyped/knockout/knockout.d.ts" />
/// <reference path="../../../bower_components/DefinitelyTyped/bootstrap/bootstrap.d.ts" />
/// <reference path="../chat/chat-message.ts" />
/// <reference path="../messaging/message-handler.ts" />
/// <reference path="../chat/username-change.ts" />
class StartView extends MessageHandler {
  username = ko.observable<string>();

  constructor(router: Router){
    super(router);
  }

  show(){
    $("#start").modal({
      show: true,
      keyboard:false
    });
  }

  startChat(){
    this.routeSend(new UsernameChange(this.username()));
    $("#start").modal('hide');
  }
}
