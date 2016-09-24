/// <reference path="../../bower_components/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/knockout/knockout.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/jquery.bbq/jquery.bbq.d.ts"/>
/// <reference path="../../typescript-definitions/jquery-nicescroll.d.ts" />
/// <reference path="crypt.ts" />
/// <reference path="./view/app-view.ts" />
/// <reference path="./chat-client.ts" />
class App {
    router: Router;
    view: AppView;
    client: ChatClient;

    constructor() {
      this.router = new Router();
      this.view = new AppView(this.router);

      var crypt = new Crypt();
      this.client = new ChatClient(this.router, crypt);
    }

    init(){
      this.view.init();
      ko.applyBindings(this.view);
    }
}
