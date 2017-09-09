// Controller for the app-sidebar
function AppSidebarController() {
  var ctrl = this;
  // Create the tags listed on the left sidebar
  ctrl.contactTags = [
    {
      label: 'All contacts',
      icon: 'star',
      state: 'none'
    },
    {
      label: 'Friends',
      icon: 'people',
      state: 'friends'
    },
    {
      label: 'Family',
      icon: 'child_care',
      state: 'family'
    },
    {
    label: 'Acquaintances',
      icon: 'accessibility',
      state: 'acquaintances'
    },
    {
      label: 'Following',
      icon: 'remove_red_eye',
      state: 'following'
    }
  ];
}

// Register the controller unter the common module
angular
  .module('common')
  .controller('AppSidebarController', AppSidebarController);
