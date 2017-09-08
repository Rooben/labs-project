// Define the controller of the app side-bar component

function AppSidebarController() {
  var ctrl = this;

  // Create a list for the contact tags
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

// Register the controller under the 'common' module
angular
  .module('common')
  .controller('AppSidebarController', AppSidebarController);
