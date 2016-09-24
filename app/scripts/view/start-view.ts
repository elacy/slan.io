/// <reference path="../../../bower_components/DefinitelyTyped/knockout/knockout.d.ts" />
/// <reference path="../../../bower_components/DefinitelyTyped/bootstrap/bootstrap.d.ts" />
/// <reference path="../chat/chat-message.ts" />
/// <reference path="../chat/send-chat-message.ts" />
/// <reference path="../messaging/message-handler.ts" />
class StartView extends MessageHandler {
  username = ko.observable<string>();

  constructor(router: Router){
    super(router);
  }

  show(){
    $("#start").modal('show');
  }

  startChat(){
    $("#start").modal('hide');
  }
}
