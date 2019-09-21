(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error("no selector provided");
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Couldn't find element with selector: " + selector);
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
      this.$formElement.on("submit", function(event) {
        event.preventDefault();

        var data = {
          coffee: this.elements.coffee.value,
          email: this.elements.emailAddress.value,
          size: this.elements.size.value,
          flavor: this.elements.flavor.value,
          strength: this.elements.strength.value
        };
        $("#appended").remove();
        $("#ex1").append("<p id='appended'>Thank you for your payment" + data.email + "</p>");
        $("#ex1").modal();

        fn(data);
        this.reset();
        this.elements[0].focus();
      });
    };
  }
  App.FormHandler = FormHandler;
  window.App = App;
})(window);
