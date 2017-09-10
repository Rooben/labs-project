// Create the ContactsController and register it under the components.contact module so that angular can know about it also.

function ContactsController($filter, $state) {
  var ctrl = this;
  var contacts = ctrl.contacts;

  //*********************************************
    /* For some strange reason, the contacts can not be found, and because of that, the filter can not work.
       But if I do 'console.log(this)', it shows the contacts array with all the data, also in the markup,
       if I do {{ $ctrl.contacts }} it shows me all of them, but in this script, 'this.contacts' returns undefined.
       Because of this, in the markup of this contacts component, and in the ng-repeat, I am looping through $ctrl.contacts
       directly in order to get the contacts displaying, instead of looping through $ctrl.filteredContacts, which should enable the filtering.
    */
        //console.log(ctrl.contacts);
        //console.log(this);
  //*********************************************


  ctrl.filteredContacts = $filter('contactsFilter')(contacts, ctrl.filter); // Apply the contactsFilter to the list of contacts, passing also the filter binding, from which the filter type can be read.

  // Create the goToContact method that will be passed down as property binding to the contact stateless component...
  // each time a specific contact is clicked on, and it will be expecting an event object containing manipulated
  // data back from the stateless component .
  ctrl.goToContact = function (event) {
    $state.go('contact', {
      id: event.contactId
    });
  };
}

angular
  .module('components.contact')
  .controller('ContactsController', ContactsController);
