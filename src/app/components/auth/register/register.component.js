// -------- Login component to contain all the register logic --------------------

var register = {
    templateUrl: './register.html', // This will be pulled in automatically and concatenated by the template module, preventing unnecessary http requests.
    controller: 'RegisterController'
};

// Angular module to contain the stateful routed component
angular
    .module('components.auth')
    .component('register', register)
    .config(function($stateProvider){
        // ** Parent State still remains as 'auth'
        // Nested child state = register
        $stateProvider
            .state('auth.register', {
                url: './register', // This '/register' url will be appended to the parent '/auth' to be '.../auth/register/...'
                component: 'register' // When the user navigates to '/auth/register/', this register component will be displayed inside the ui-view under the parent state auth.
            });
    });