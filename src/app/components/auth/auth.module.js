// Define the 'components.auth' module, register it with angular and also register the...
// firebase configuration to angular through the newly created 'components.auth' module.
angular
    .module('components.auth', [
        'ui.router',
        'firebase'
    ])
    // Configure the firebase front-end/backend communication
    .config(function ($firebaseRefProvider){
        var config = {
            apiKey: "AIzaSyDGY48cKwBciicrIqFyDv44KepZ1pP2ZhE",
            authDomain: "secondproject-c03b0.firebaseapp.com",
            databaseURL: "https://secondproject-c03b0.firebaseio.com",
            projectId: "secondproject-c03b0",
            storageBucket: "",
            messagingSenderId: "115518792640"
        };

        // Establishes the database url
        $firebaseRefProvider
            .registerUrl({
                default: config.databaseURL,
                contacts: config.databaseURL + '/contacts' // This is the API with which the front-end will be talking, in order to make requests.
            });

        firebase.initializeApp(config);
    })
    // Setup the transition hooks that call specific functions when specific routes are navigated to, will be...
    // applied to all the routes, and while that happens, any errors that occur are captured by the catch() method and user will be directed to the login view.
    .run(function ($transitions, $state, AuthService){
        // Create transition hook for transition start
        $transitions.onStart({// On transition start, dynamically check the route to which the user wants to go.
            to: function (state) {
                // Check if the current route's config has the data property and whether it requires auth or not.
                return !!(state.data && state.data.requiredAuth); // Return true or false, based on whether the the route the user want to go to, requires authentication or not.
            }
        },
        // This function is run if the user requires authentication
        function(){
            return AuthService
                .requireAuthentication()
                .catch(function (){// This catch method runs if any issue or error occurs with any transition, or if the user trys to access a login protected route, consecuently, user will be sent to the login page.
                    return $state.target('auth.login');// Redirects the user to the login page.
                });
        });
        $transitions.onStart({
            to: 'auth.*' // If the user navigates to auth.login or auth.register route, the function that follows will be run.
        },
        // Prevent users from going to the login page if they are already logged in.
        function (){ // When this function is run, it then uses the auth service to check if this user is logged in.
            if (AuthService.isAuthenticated()){
                return $state.target('app'); // If the current user is logged in, just redirect him to the 'app' route.
            }
        });
    });