/// <reference path="../../bower_components/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/knockout/knockout.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/jquery.bbq/jquery.bbq.d.ts"/>
/// <reference path="../../typescript-definitions/jquery-nicescroll.d.ts" />
/// <reference path="crypt.ts" />
/// <reference path="./view/app-view.ts" />
/// <reference path="./chat-client.ts" />
/// <reference path="./chat/channel.ts" />
class App {
    router: Router;
    view: AppView;
    client: ChatClient;
    channel: Channel;
    hasInit = false;

    constructor() {
      this.router = new Router();
      this.view = new AppView(this.router);

      this.channel = new Channel(this.router);
      this.client = new ChatClient(this.router);
    }

    init(){
      this.hasInit = true;
      this.view.init();
      ko.applyBindings(this.view);
    }
}
