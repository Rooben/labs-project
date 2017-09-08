// The authForm component definition

var authForm = {
    bindings: {
        // List of data being received from the parent scope, and to be used within this component
        user: '<',
        button: '@',
        message: '@',
        onSubmit: '&'
    },
    templateUrl: './auth-form.html',
    controller: 'AuthFormController'
};


// Register the authForm component with angular through the 'components.auth' module
angular
    .module('components.auth')
    .component('authForm', authForm);