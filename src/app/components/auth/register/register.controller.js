// Register controller to handle the logic for the auth app

function RegisterController(AuthService, $state){
  var ctrl = this;
  // Initialize who the user is and any errors that might be passed by firebase
  ctrl.$onInit = function(){
    ctrl.error = null;  // Will hold errors
    ctrl.user = {       // Will hold who is logged in as user
      email: '',
      password: ''
    };
  };

  // Create a user function which can pass user details through the event object, from child
  // components, which would further be sent to firebase for final creation of this user in the database
  ctrl.createUser = function(event){
    return AuthService
        .register(event.user)
        .then(function(){
          $state.go('app'); // This state is built to show only contents meant for authenticated users.
        }, function(reason){
          ctrl.error = reason.message; // In case firebase rejects the promise, pass back the error message to the register controller, which will be passed down to the auth-form component for display.
        });
  }
}


angular
    .module('components.auth')
    .controller('RegisterController', RegisterController);