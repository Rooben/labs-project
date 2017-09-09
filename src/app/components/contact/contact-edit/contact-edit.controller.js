function ContactEditController($state, ContactService, cfpLoadingBar, $window) {
  var ctrl = this;
  ctrl.updateContact = function (event) {
    cfpLoadingBar.start(); // Start the loading bar
    return ContactService
      .updateContact(event.contact)
      .then(cfpLoadingBar.complete, cfpLoadingBar.complete); // Complete the loading bar in case of success and also in case of error, hence twice.
  };
  ctrl.deleteContact = function (event) {
    var message = 'Delete ' + event.contact.name + ' from contacts?';
    if ($window.confirm(message)) { // Make the user confirm whether he wants to delete.
      return ContactService
        .deleteContact(event.contact)
        .then(function () {
          $state.go('contacts'); // If delete is successful, redirect to the contacts route.
        });
    }
  };
}

angular
  .module('components.contact')
  .controller('ContactEditController', ContactEditController);
