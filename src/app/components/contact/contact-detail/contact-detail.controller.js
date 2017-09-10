// Create the ContactDetailController for the contact-detail component

function ContactDetailController() {
  var ctrl = this;

  ctrl.$onInit = function () {
    // If there is no contact.$id, then this is a new concact,
    // so the isNewContact property will be true.
    if(ctrl.contact){
      ctrl.isNewContact = !ctrl.contact.$id;
    }
  };

  // Wrapper for the onSave calback function, will pass back the event object to the parent component
  ctrl.saveContact = function(){
    // Call the onSave binding method sent down from the parent and now pass back to it the...
    // event object containing the updated contact object, and this will be based on whether...
    // a new contact object is being created or an existing one is being updated.
    ctrl.onSave({
      $event: {
        contact: ctrl.contact
      }
    });
  };
  // Wrapper for the onUpdate calback function, will pass back the event object to the parent component
  ctrl.updateContact = function () {
    ctrl.onUpdate({
      $event: {
        contact: ctrl.contact
      }
    });
  };
  // Wrapper for the onDelete calback function, will pass back the event object to the parent component
  ctrl.deleteContact = function () {
    ctrl.onDelete({
      $event: {
        contact: ctrl.contact
      }
    });
  };

  // Register a tag change when the tag changes, and also let the updateContact method run, in order to load the new tag changes.
  ctrl.tagChange = function (event) {
    ctrl.contact.tag = event.tag;
    ctrl.updateContact();
  }
}

// Register the ContactDetailController with the components.contact module
angular
    .module('components.contact')
    .controller('ContactDetailController', ContactDetailController);
