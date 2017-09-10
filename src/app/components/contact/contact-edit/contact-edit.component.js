// Create the contact-edit routed component definition object
/* One purpose of this component is that, when we want to edit a contact, we want this app
 to be able to go an fetch the data for the component to be edited, before transissioning to that component,
 that's why this contact-edit component should be a stateful routed component, as opposed to other components
 that are routed but not stateful, because they wouldn't need to go fetch any data before loading, and again
 that's why we would need the resolve property in the state configuration.*/
var contactEdit = {
  bindings: {
    contact: '<' // This contact binding is not coming from a parent component, but from the resolve in the config
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
            var key = $transition$.params().id;  // Read the id from the URL during transition and pass the value to the key property.
              // Pass the extracted id to the ContactService for it to return the specific contact in the view by the use of it's id.
              return ContactService.getContactById(key).$loaded(); // This is  a promise that would be resolved when the contact is loaded.
          }
        }
      });
  });
