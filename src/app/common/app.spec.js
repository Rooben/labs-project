// Testing the app methods and properties

// Test suit
describe('App', function () {
  // Define the beforeEach() methods, which will be run before each spec is run.  This is where property resets can be done.
  // Load one of the most important modules(ui-router) required for the app features we want to test, enabled...
  // by the angular-mocks module's as a global module() method.
  beforeEach(module('ui.router'));


  // Load the module under which the app component is registerd, which is the common module, also enabled by...
  // the angular-mocks global method, which is the module method. Could also be achieved with angular-mocks.module()
  beforeEach(module('common', function ($provide) {
    $provide.value('AuthService', { // Inject the AuthService as a dependency
      getUser: angular.noop,  // Create an empty function placeholder named getUser to simulate the getUser method
      logout: angular.noop     // Create another empty function placeholder named logout to simulate the logout method
    });
  }));

  // Load the 'components.auth' module
  beforeEach(module('components.auth'));

  // Load the 'contacts' state and pass the 'app/contacts' as it's dependency
  beforeEach(module(function ($stateProvider) {
    $stateProvider.state('contacts', { url: 'app/contacts' });
  }));

  // A nested suit to be used to test the routes
  describe('Routes', function () {
    var $state, $location, $rootScope, AuthService; // Declare the variables

    // Simulate the goTo() function and make it run the $location.url and $rootScope.$digest methods.
    // required to simulate the current route and to simulate the digest cycle.
    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    // Load the angular $injector, also made available by angular-mocks as a global property,
    // and use this $injector to inject the rest of the angular services required in our tests.
    beforeEach(inject(function ($injector) {
      $state = $injector.get('$state');  // Inject the $state service and assign to the variable $state
      $location = $injector.get('$location'); // Inject the $location service and assign to the variable $location
      $rootScope = $injector.get('$rootScope'); // Inject the $rootScope service and assign to the variable $rootScope
      AuthService = $injector.get('AuthService'); // Inject the AuthService service and assign to the variable AuthService
    }));

    // Define the first spec or test, which tests the contacts state redirect
    it('should redirect to contacts state', function () {
      spyOn(AuthService, 'isAuthenticated').and.returnValue(true);  // Test if the 'isAuthenticated' method of the AuthService was called.

      goTo('/app');  // Use the goTo method above to simulate the '/app' route redirect

      expect($state.current.name).toEqual('contacts');  // Assert if the current state is 'contacts' as a resulte of running the goTo('/app') method.
    });
  });


  // A suite to test the AppController
  describe('AppController', function () {
    // Define variables
    var $rootScope, $q, $componentController, controller, AuthService, $state;

    // Load the $injector and inject the services required for this test
    beforeEach(inject(function ($injector) {
      $rootScope = $injector.get('$rootScope'); // Inject the rootScope
      $q = $injector.get('$q');                 // Inject the $q service
      $componentController = $injector.get('$componentController'); // Inject the component controller
      AuthService = $injector.get('AuthService'); // Inject the AuthService
      $state = $injector.get('$state');           // Inject the $state service
    }));

    // Test the AuthService.getUser method to see if it was called and would return the first user
    it('should get user on instantiated', function () {
      var user = { $id: 1 }
      spyOn(AuthService, 'getUser').and.returnValue(user);

      controller = $componentController('app',        // Define the controller of the 'app' component and inject the it's dependencies like $scope, state and others.
        { $scope: {}, AuthService: AuthService, $state: $state }
      );

      expect(AuthService.getUser).toHaveBeenCalled();
      expect(controller.user).toEqual(user);
    });


    // Test the logout method of the AuthService to see if it was called and was redirected to the 'auth.login' route.
    it('should go to the login state on logout', function () {
      // Arrange the test by calling the necessary methods that would simulate the test conditions.
      spyOn(AuthService, 'logout')
        .and.callFake(function () {
        var deferred = $q.defer();
        deferred.resolve();
        return deferred.promise;
      });
      spyOn($state, 'go').and.callThrough();

      // Create the component controller and inject it's dependencies.
      controller = $componentController('app',
        { $scope: {}, AuthService: AuthService, $state: $state }
      );

      // Arrange the test by calling the necessary methods that would simulate the test conditions.
      controller.logout();
      $rootScope.$digest();

      expect(AuthService.logout).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalledWith('auth.login');
    });
  });

});
