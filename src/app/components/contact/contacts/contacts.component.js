// Create the contacts component definition object and register it under the components.contact module.

var contacts = {
 // These binding are going to be supplied by the state config and routing module.
  bindings: {
    contacts: '<',  // Comes from the ui-router's resolve property
    filter: '<'     // Comes from the ui-router's params property
  },
  templateUrl: './contacts.html',
  controller: 'ContactsController'
};

angular
  .module('components.contact')
  .component('contacts', contacts)
  .config(function ($stateProvider) {
    $stateProvider
      .state('contacts', {
        parent: 'app',   // This will be a child-route inside the 'app' component
        url: '/contacts?filter',
        component: 'contacts',
        params: {
          filter: {
            value: 'none'
          }
        },
        resolve: {
          // Pull all the contacts from firebase and pass the array down to stateless components as a binding parameter
          contacts: function (ContactService) {
            return ContactService.getContactList().$loaded(); // When this promise is resolved, it returns all the contacts.
          },
          // Extrac filter type from the transision url, and pass the extracted value as a binding input down to stateles components.
          filter: function ($transition$) {
            return $transition$.params();
          }
        }
      });
  });
