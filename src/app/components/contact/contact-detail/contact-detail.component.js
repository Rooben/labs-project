// Create the contactDetail component, which is a stateless component

var contactDetail = {
  bindings: {
    contact: '<',
    onSave: '&',
    onUpdate: '&',
    onDelete: '&'
  },
  templateUrl: './contact-detail.html',
  controller: 'ContactDetailController'
};


// Register the contactDetail component with the 'components.contact' module.
angular
    .module('components.contact')
    .component('contactDetail', contactDetail);
