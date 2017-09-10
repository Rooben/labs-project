// Create a definition object for the contact component, which will represent a single contact from the list of contacts
var contact = {
  bindings: {
    contact: '<',
    onSelect: '&'
  },
  templateUrl: './contact.html',
  controller: 'ContactController'
};


// Register the contact component under the 'components.contact' module
angular
  .module('components.contact')
  .component('contact', contact);
