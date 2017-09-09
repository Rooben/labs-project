// Create the appNav definition object
var appNav = {
  bindings: {
    user: '<',
    onLogout: '&' // logout callback
  },
  templateUrl: './app-nav.html'
};

// Register the appNav component under the common module
angular
  .module('common')
  .component('appNav', appNav);
