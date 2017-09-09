// Create the controller of the contactNew component

function ContactNewController(ContactService, $state) { // Inject the contact service and the $state to be used here
  var ctrl = this;
  // Create initial data in the onInit life cycle hook
  ctrl.$onInit = function () {
    // Set up the contact properties during initial load
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
      tag: 'none'
    };
  };

  // Create function to be used to create a new contact
  ctrl.createNewContact = function (event) {
    return ContactService
    // Pass in the event object received from the stateless component
        .createNewContact(event.contact)
        .then(function (contact) {
          console.log(contact);
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
