// Create the ContactDetailController for the contact-detail component

function ContactDetailController() {
  var ctrl = this;

  ctrl.$onInit = function () {
    // If there is no contact.$id, then this is a new concact,
    // so the isNewContact property will be true.
    ctrl.isNewContact = !ctrl.contact.$id;
  };

  // Wrapper for the onSave calback function, will pass back the event object to the parent component
  ctrl.saveContact = function () {
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

  ctrl.tagChange = function (event) {
    ctrl.contact.tag = event.tag;
    ctrl.updateContact();
  }
}

// Register the ContactDetailController with the components.contact module
angular
    .module('components.contact')
    .controller('ContactDetailController', ContactDetailController);
