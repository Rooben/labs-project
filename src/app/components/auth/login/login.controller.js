// Login controller to handle the logic for the login app

function LoginController(AuthService, $state) { // AuthService is injected, will be used to communicate with firebase
    var ctrl = this;
    // Setup key data required at the start of the application, best practice to set them in the onInit lifecycle hook
    ctrl.$onInit = function(){
        ctrl.error = null; // Will store any error from firebase, for eventual display to the user
        // User object to keep track of who is logged in by email and password
        ctrl.user = {
            email: '',
            password: ''
        };
    };

    // Function that gets called in order to log the current user in, by sending the current user data to firebase.
    ctrl.loginUser = function(event){ // Function is expecting an event object to be passed back from the stateless auth-form component
        // The login method of the injected AuthService returns a promise that resolves with the...
        // user data if successful, or if not, rejects with an error reason.
        return AuthService
            .login(event.user)
            .then(function(){
                $state.go('app'); // If successful, redirect the user to the 'app' route so that he can be allowed to use the app
            }, function (reason) {
                // If unsuccessful, pass the error message to the controller error property...
                // to be passed down to the stateless component for further display to the user
                ctrl.error = reason.message;
            });
    };
}

angular
    .module('components.auth')
    .controller('LoginController', LoginController);