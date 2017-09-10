// Create the ContactController and register it with angular through the 'component.contact' module.

function ContactController() {
  var ctrl = this;

  // When this contact is clicked, the selectContact method is run, and this will pass the current contact object...
  // back to the parent component(contacts), by calling the binding method (onSelect) and passing the id of the..
  // current contact which the user wants to view. Since this would be an existing contact that was passed down
  // from firebase, it would already contain the id property, and this stateless component passes it back to...
  // indicate that this is the contact the user has selected.
  ctrl.selectContact = function () {
    ctrl.onSelect({
      $event: {
        contactId: ctrl.contact.$id
      }
    });
  };
}

angular
  .module('components.contact')
  .controller('ContactController', ContactController);
