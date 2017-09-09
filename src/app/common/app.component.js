// Define the 'app' component and register it with angular through the...
// common module, and also configure it's route.

// Routed app component definition object.
var app = {
    templateUrl: './app.html',
    controller: 'AppController'
};

angular
    .module('common')
    .component('app', app)
    // Configure the app route
    .config(function ($stateProvider) {
        $stateProvider
            .state('app', {
                redirectTo: 'contacts',
                url: '/app',
                data: {
                    requiredAuth: true
                },
                component: 'app'
            })
    });
