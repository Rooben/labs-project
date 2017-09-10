// Create a contact-tag controller and register it under the components.contact module

function ContactTagController() {
  var ctrl = this;

  ctrl.$onInit = function () {
    // Create an array of tag lables to be statically rendered in the tags
    ctrl.tags = [
      'friends', 'family', 'acquaintances', 'following'
    ];
  };

  // Create the onChanges lifecycle hook that checks if the tag binding has changed, so that it can update the tag values.
  ctrl.$onChanges = function (changes) {
    if (changes.tag) {
      ctrl.tag = angular.copy(ctrl.tag); // Make a copy of the updated tag and store in memory, so that when this.updateTag is called, it sends back but the copy, in order to ensure one way communication,
    }
  };

  // Update the tags that have changed and that were also copied and stored in memory by the onChange lifecycle hook above, and then send up to the $ctrl.updateContact method of the parent component(contact-detail).
  ctrl.updateTag = function (tag) {
    ctrl.onChange({
      $event: {
        tag: tag
      }
    });
  };
}

angular
  .module('components.contact')
  .controller('ContactTagController', ContactTagController);
