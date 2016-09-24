/// <reference path="chat-view.ts" />
/// <reference path="start-view.ts" />

class AppView{
  chat: ChatView;
  start: StartView;

  constructor(router: Router){
    this.chat = new ChatView(router);
    this.start = new StartView(router);
  }

  init(){
    this.start.show();
  }
}
