// Controller for the 'app' component

function AppController(AuthService, $state) { // Inject the AuthService and the $state service since they will be used in this controller
  var ctrl = this;

  // Store who the current user is, in memory.
  ctrl.user = AuthService.getUser();  // The user data is available as soon as the user is logged in. This returns the user.


  // Create a function that will be called if the user has to be logged out.
  // This function in turn calls the 'logout' function of the AuthService, which returns a promise.
  ctrl.logout = function () {
    AuthService.logout().then(function () {
      $state.go('auth.login');  // If the returned promise resolves, show the user the login view.
    });
  };
}

angular
  .module('common')
  .controller('AppController', AppController);
