// Define the 'components.auth' module, register it with angular and also register the...
// firebase configuration to angular through the newly created 'components.auth' module.
angular
    .module('components.auth', [
        'ui.router',
        'firebase'
    ])
    .config(function($firebaseRefProvider){
        var config = {
            apiKey: "AIzaSyCtvK89fjkaHN_aYDpMCv13Ic7trdRG_XY",
            authDomain: "angular-labs.firebaseapp.com",
            databaseURL: "https://angular-labs.firebaseio.com",
            projectId: "angular-labs",
            storageBucket: "angular-labs.appspot.com",
            messagingSenderId: "712675635522"
        };
        $firebaseRefProvider
            .registerUrl({
                default: config.databaseURL,
                contacts: config.databaseURL + '/contacts'
            });
        firebase.initializeApp(config);
    });