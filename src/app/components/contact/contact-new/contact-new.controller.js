// Create the controller of the contactNew component

function ContactNewController(ContactService, $state) { // Inject the contact service and the $state to be used here
  var ctrl = this;
  // Create initial data in the onInit life cycle hook
  ctrl.$onInit = function () {
    // Set up the user contact input properties. Best to be done at the initial load life cycle.
    ctrl.contact = {
      name: '',
      email: '',
      job: '',
      location: '',
      social: {
        facebook: '',
        github: '',
        twitter: '',
        linkedin: ''
      },
      tag: 'none' // By default, this is set to none, but each time a tag is clicked on, this will be set to the clicked tag.
    };
  };

  // Define a function to be used to create a new contact, by receiving data from a stateless component and then forward to firebase.
  ctrl.createNewContact = function (event) {
    return ContactService
    // Pass in the event object received from the stateless component
        .createNewContact(event.contact)// Passed-in contact from the stateless component is passed to firebase through the ContactService.
        .then(function (contact) {
          // At this point, the new contact should have been created and can be retrieved back here, from firebase.
          $state.go('contact', {
            id: contact.key
          });
        });
  };
}

// Register the ContactNewController under the components.contact module
angular
    .module('components.contact')
    .controller('ContactNewController', ContactNewController);
