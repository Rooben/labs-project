// Define the app side-bar component and register it to angular under the 'common' module

var appSidebar = {
  templateUrl: './app-sidebar.html',
  controller: 'AppSidebarController'
};


// Register the side-bar component to the 'common' module, and that's how angular will know about it.
angular
  .module('common')
  .component('appSidebar', appSidebar);
