// -------- Login component to contain all the login logic --------------------

var login = {
    templateUrl: './login.html', // This will be pulled in automatically and concatenated by the template module, preventing unnecessary http requests.
    controller: 'LoginController'
};

// Register the login component to angular through the 'components.auth' module
angular
    .module('components.auth')
    .component('login', login)
    //Configure routing for the auth and login single pages
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('auth', {
                redirectTo: 'auth.login',
                url: '/auth',
                template: '<div ui-view></div>' // The ui-view here will be used to display the nested view which is login
            })
            .state('auth.login', {
                url: '/login', // This '/login' url will be appended to the parent '/auth' to be '.../auth/login/...'
                component: 'login' // When the user navigates to '/auth/login/', this login component will be displayed inside the ui-view under the parent state auth.
            });
        $urlRouterProvider.otherwise('/auth/login'); // Any other route not understood by the login app, defaults to '/auth/login/'

    });


