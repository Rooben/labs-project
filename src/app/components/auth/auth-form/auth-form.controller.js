// Auth Form controller to handle the logic within the auth-form component

function AuthFormController(){
  var ctrl = this;
  // onChanges lifecycle hook executes whenever any change is made to the data received from the parent scope.
  ctrl.$onChanges = function(changes){ // The changes object here contains the properties that have changed from the list: user, button, message and onSubmit.

    // If the user object is amongst the properties that have changed, make a copy of it and store in memory...
    // so that this copy will be what gets passed up to the login or register component when the time comes for that.
    if (changes.user){
      ctrl.user = angular.copy(ctrl.user);
    }

  };

  // When the submit button of the auth-form component is clicked, run this function that calls the....
  // 'onSubmit' function passed down from either the login component or the register component.
  // This 'onsubmit' function defined in the parent(login or register) is expecting an event object, so we...
  // we now pass to it the a hash which contains an event object, which inturn contains the user property...
  // and then we now assign the user object to it. This user object is the one that was copied to the memory above, which breaks the javaScript reference behavior and guaranties one way binding.
  ctrl.submitForm = function(){
    ctrl.onSubmit({
      $event: {
        user: ctrl.user // copy
      }
    });
  };
}

angular
    .module('components.auth')
    .controller('AuthFormController', AuthFormController);