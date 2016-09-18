/// <reference path="chat-view.ts" />

class AppView{
  chat: ChatView;

  constructor(router: Router){
    this.chat = new ChatView(router);
  }
}
