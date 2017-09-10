// Define the test suite

describe('Auth', function () {
  // Load the 'components.auth' module with angular.mocks.module()
  beforeEach(module('components.auth'));

  // Load the app state
  beforeEach(module(function ($stateProvider) {
    $stateProvider.state('app', { url: '/' });
  }));


  // Define the Routes suite
  describe('Routes', function () {
    var $state, $location, $rootScope; // Declare variables required for this test suite.

    // Simulate the goTo() method, and also make the url and digest cycle available to this suite.
    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    // Inject the injector method of the angular-mock module, and use it to inject the required services.
    beforeEach(inject(function ($injector) {
      $state = $injector.get('$state');
      $location = $injector.get('$location');
      $rootScope = $injector.get('$rootScope');
    }));

    // Write a test that asserts if the current state is 'auth.login' when the route is '/auth'
    it('should redirect to auth.login state', function() {
      goTo('/auth');
      expect($state.current.name).toEqual('auth.login')
    });

    // Write a test to assert if the user will be taken to the login route if the current state is 'auth.login'
    it('should go to auth.login state', function() {
      goTo('/login');
      expect($state.current.name).toEqual('auth.login')
    });
  });

  // Write a test suite for the loginController
  describe('LoginController', function () {
    // Declare variables required for this test suite
    var $componentController,
      controller,
      AuthService,
      $state,
      $rootScope,
      $q;

    // Use the $inject property to inject all the services required to be able to run these tests.
    beforeEach(inject(function ($injector) {
      $componentController = $injector.get('$componentController');
      AuthService = $injector.get('AuthService');
      $state = $injector.get('$state');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');

      // Create the controller for the login component and inject the $scope, AuthService and $state.
      controller = $componentController('login',
        { $scope: {}, AuthService: AuthService, $state: $state }
      );
    }));

    // Assert if the Controller initializes with initial user input properties having the default values
    it('should initialize with correct properties', function () {
      controller.$onInit();

      expect(controller.error).toBeNull();
      expect(controller.user.email).toEqual('');
      expect(controller.user.password).toEqual('');
    });

    // Assert if the login method of the AuthService was called and will be able to login the first user into the app.
    it('should redirect on successful login ', function () {
      var mockUser = { email: 'test@test.com', password: 'insecure' },
        mockEvent = { $event: { user: mockUser } };

      spyOn(AuthService, 'login').and.callFake(function() {
        return $q.when({$id: 1});
      });

      spyOn($state, 'go');

      var promise = controller.loginUser(mockEvent);

      promise.then(function(result){
        expect(AuthService.login).toHaveBeenCalledWith(mockEvent.user);
        expect($state.go).toHaveBeenCalledWith('app');
      });

      $rootScope.$digest();
    });


    // Assert that the login method of the AuthService will give an error if an error occurs during login
    it('should set error on failed login ', function () {
      var mockUser = { email: 'test@test.com', password: 'insecure' },
        mockEvent = { $event: { user: mockUser } },
        mockMessage = 'wrong username or password';

      spyOn(AuthService, 'login').and.callFake(function() {
        return $q.reject({ message: mockMessage});
      });

      spyOn($state, 'go');

      var promise = controller.loginUser({});

      promise.then(function(result){
        expect(AuthService.login).toHaveBeenCalledWith(mockEvent.user);
        expect(controller.error).toEqual(mockMessage);
        expect($state.go).not.toHaveBeenCalled();
      });

      $rootScope.$digest();
    });
  });
});