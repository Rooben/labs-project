// Setup the contactNew component object and register it under the 'components.contact' module
var contactNew = {
    templateUrl: './contact-new.html',
    controller: 'ContactNewController'
};

// Register the contactNew component and setup it's routing configuration
angular
    .module('components.contact')
    .component('contactNew', contactNew)
    .config(function ($stateProvider){
        $stateProvider
            .state('new', {
                parent: 'app',  //  This property makes this state a child state of the 'app' state and...
                                // thus inherits the state data properties, hence this state will also require authentication.
                url: '/new',
                component: 'contactNew'
            });
    });
