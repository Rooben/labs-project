// Define the AuthService

function AuthService($firebaseAuth) { // The $firebaseAuth is an inbuilt angular service, just like the $http service that establishes communitaction with firebase
    // Invocking the $firebaseAuth service returns an instance which we...
    // could use in this app, and it gives use methods like $signInWithEmailAndPassword through which we can pass our user data to firebase
    var auth = $firebaseAuth();
    var authData = null; // Will hold the user authenticated data and stores it in memory.

    // Create a private helper method just to be used to dynamically set the authData property above, during register or login
    function storeAuthData(response) {
        authData = response;
        return authData;
    }

    // Create a private method that checks if the passed in user has effectively signed in or not
    function onSignIn(user) {
        authData = user;
        return auth.$requireSignIn(); // Use the firebase $requireSignIn method to determine if this user still needs to sign in or not
    }

    // Create a private method to be used to reset the user data to null when a new start is required
    function clearAuthData() {
        authData = null;
    }

    // Create a public method to be called in the login component controller, when...
    // the user data(passed in) coming from the auth-form component or any other stateless...
    // component needs to be sent to firebase by invoking the firebase's $signInWithEmailAndPassword, which...
    // returns a promise, and when the promise resolves, the private storeAuthData defined above is called.
    this.login = function (user) {
        return auth
            .$signInWithEmailAndPassword(user.email, user.password)
            .then(storeAuthData);
    };

    // Create a public method to be called in the register component controller, when...
    // the user data(passed in) coming from the auth-form component or any other stateless...
    // component needs to be sent to firebase by invoking the firebase's $createUserWithEmailAndPassword, which...
    // returns a promise that when resolved, calls the private method storeAuthData which stores the user data.
    this.register = function (user) {
        return auth
            .$createUserWithEmailAndPassword(user.email, user.password)
            .then(storeAuthData);
    };

    // Create a public method to be called in the login component controller, when user has to be logged out.
    // This will invoke the firebase's $signOut method, which returns a promise, and when the promise resolves,
    // the private clearAuthData defined above is called.
    this.logout = function () {
        return auth
            .$signOut()
            .then(clearAuthData);
    };

    // Create a public method that gets called in any controller that injects this service, to check if the...
    // current user has effectively logged in or not. This calls firebase's $waitForSignIn method that also...
    // returns a promise, and if this promise is resolved, it then calls the private method 'onSignIn', which...
    // in turn checks with firebase if the user has signed in, by invoking the firebase's $requireSignIn boolean method.
    this.requireAuthentication = function () {
        return auth
            .$waitForSignIn().then(onSignIn);
    };

    // Create a public method that can be called in a controller with this service injected, that quickly checks...
    // if the current user is authenticated or not.
    this.isAuthenticated = function () {
        return !!authData; // Converts the authData property to a boolean, if null returns false, otherwise, true.
    };

    // Create a public method that can be called from a controller that injects this service, to provide the user.
    this.getUser = function () {
        if (authData) { // returns the value of authData if it is not null or undefined.
            return authData;
        }
    };
}

angular
    .module('components.auth')
    .service('AuthService', AuthService);
