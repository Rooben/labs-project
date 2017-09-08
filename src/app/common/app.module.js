// Define the common module, which contains the real app to be shown only to the users who are fully authenticated.
// This will be the full application which shows things like the navbar, the footer, sidebar, etc

angular
    .module('common', [
    'ui.router',
    'angular-loading-bar' // Register the loading bar module as a dependency.
    ])
    // Show and hide the loading bar based on the view transitions
    .run(function ($transitions, cfpLoadingBar){  // cfpLoadingBar is a service given to us by the angular-loading-bar module
        $transitions.onStart({}, cfpLoadingBar.start); // cfpLoadingBar.start will be invoked when onStart event is called
        $transitions.onSuccess({}, cfpLoadingBar.complete); // cfpLoadingBar.complete will be invoked when onSuccess is called
    });
