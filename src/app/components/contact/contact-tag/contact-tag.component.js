// Create the contact-tag component and register it under the components.contact module
var contactTag = {
  bindings: {
    tag: '<',
    onChange: '&'
  },
  templateUrl: './contact-tag.html',
  controller: 'ContactTagController'
};

angular
  .module('components.contact')
  .component('contactTag', contactTag);
