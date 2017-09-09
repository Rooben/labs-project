// Create the contact-edit routed component definition object

var contactEdit = {
  bindings: {
    contact: '<'
  },
  templateUrl: './contact-edit.html',
  controller: 'ContactEditController'
};


// Register the contact-edit component with the components.contact module
angular
  .module('components.contact')
  .component('contactEdit', contactEdit)
  .config(function ($stateProvider) {
    $stateProvider
      .state('contact', {
        parent: 'app', // This route will be protected by firebase authentication, because the parent is set to app, which requires login.
        url: '/contact/:id', // The id in this case corresponds to the contact.key that was specified in ContactNewController's createNewContact method.
        component: 'contactEdit',
       // Use the resolve property to make sure the app fetches the component data and have it ready before we transision to this contact.
        resolve: {
          contact: function ($transition$, ContactService) {
            var key = $transition$.params().id;
            return ContactService.getContactById(key).$loaded();
          }
        }
      });
  });
