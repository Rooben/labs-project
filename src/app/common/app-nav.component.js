// Define the app nav-bar component and register it to angular under the 'common' module

var appNav = {
  // Bind all the data to be received from the parent scope('app scope'), being passed down to this nav-bar component
  bindings: {
    user: '<',
    onLogout: '&' // callback function to be called on a logout event
  },
  templateUrl: './app-nav.html'
};

// Register the nav-bar component to the common module, and that's how angular will know about it.
angular
  .module('common')
  .component('appNav', appNav);
