(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied");
    }
    this.serverUrl = url;
  }
  RemoteDataStore.prototype.add = function(key, val) {
    var tempObject = {
      coffee: val.coffee,
      emailAddress: val.email,
      flavor: val.flavor,
      size: val.size,
      strength: val.strength,
    };
    return $.post(this.serverUrl, tempObject, function(serverResponse) {
      console.log(serverResponse);
    });
  };
  RemoteDataStore.prototype.getAll = function() {
    return $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
    });
  };
  RemoteDataStore.prototype.get = function(key) {
    return $.get(this.serverUrl + "/" + key, function(serverResponse) {
      console.log(serverResponse);
    });
  };
  RemoteDataStore.prototype.remove = function(key) {
    return $.ajax(this.serverUrl + key, {
      type: "DELETE"
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);