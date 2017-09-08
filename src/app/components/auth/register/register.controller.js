// Register controller to handle the logic for the auth app

function RegisterController(){
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
                console.log('USER', user);
            }, function(reason){
                ctrl.error = reason.message;
            });
    }
}


angular
    .module('components.auth')
    .controller('RegisterController', RegisterController);