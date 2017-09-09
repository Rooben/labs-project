// Set up the app-sidebar component and register it under the common module

var appSidebar = {
  templateUrl: './app-sidebar.html',
  controller: 'AppSidebarController'
};

angular
  .module('common')
  .component('appSidebar', appSidebar);
