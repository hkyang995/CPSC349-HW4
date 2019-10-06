(function(window) {
  "use strict";
  var FORM_SELECTOR = "[data-coffee-order='form']";
  var CHECKLIST_SELECTOR = "[data-coffee-order='checklist']";
  var SERVER_URL = "http://localhost:2403/coffeeorders";
  var App = window.App;
  var FormHandler = App.FormHandler;
  var Truck = App.Truck;
  var Validation = App.Validation;
  //var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var CheckList = App.CheckList;

  var remoteDS = new RemoteDataStore(SERVER_URL);
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  var myTruck = new Truck("ncc-1701", remoteDS);
  window.myTruck = myTruck;

  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(function(data) {
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });
  formHandler.addInputHandler(Validation.isCompanyEmail);
})(window);
