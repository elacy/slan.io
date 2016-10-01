/// <reference path="../../bower_components/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../typescript-definitions/jquery-nicescroll.d.ts" />
/// <reference path="app.ts" />

var app = new App();

$(function(){
    app.init();
})

var bindingHandlers = <any> ko.bindingHandlers;

bindingHandlers.enterkey = {
    init: function (element, valueAccessor, allBindings, viewModel) {
        var callback = valueAccessor();
        $(element).keypress(function (event) {
            var keyCode = (event.which ? event.which : event.keyCode);
            if (keyCode === 13) {
                callback.call(viewModel);
                return false;
            }
            return true;
        });
    }
};

bindingHandlers.messages = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        $(element).niceScroll();
        ko.applyBindingsToNode(element, {
          foreach: {
            data: valueAccessor(),
            afterRender: function(){
              var scroll = $(element).getNiceScroll(0);
              scroll.resize();
              scroll.doScrollTop(scroll.page.h, 300);

            }
          }
        }, bindingContext);
    }
};
