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
    // Declare variables required for this test suite.
    var $state, $location, $rootScope, AuthService;

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
      AuthService = $injector.get('AuthService');
    }));

    // Write a test that asserts if the current state is 'auth.register' when the route is '/auth/register'
    it('should go to auth.register state', function() {
      spyOn(AuthService, 'requireAuthentication').and.callFake(
        function () {
          return $q.when('is authenticated');
        }
      );
      goTo('/auth/register');
      expect($state.current.name).toEqual('auth.register')
    });

    // Write a test to assert if the user will be taken the app if he is already authenticated
    it('should redirect to app state', function() {
      spyOn(AuthService, 'isAuthenticated').and.returnValue(true);
      goTo('/auth/register');
      expect($state.current.name).toEqual('app')
    });
  });

  // A test suite for the RegisterController
  describe('RegisterController', function () {
    // Declare the variables
    var $componentController,
      controller,
      AuthService,
      $state,
      $rootScope,
      $q;

    // Inject the reqired services
    beforeEach(inject(function ($injector) {
      $componentController = $injector.get('$componentController');
      AuthService = $injector.get('AuthService');
      $state = $injector.get('$state');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');

      // Instanciate the component controller
      controller = $componentController('register',
        { $scope: {}, AuthService: AuthService, $state: $state }
      );
    }));

    // Test if the component controller will initialize with the default user input properties
    it('should initialize with correct properties', function () {
      controller.$onInit();

      expect(controller.error).toBeNull();
      expect(controller.user.email).toEqual('');
      expect(controller.user.password).toEqual('');
    });

    // Test if the register method of the AuthService will redirect to the app on successful registration
    it('should redirect on successful registration ', function () {
      var mockUser = { email: 'test@test.com', password: 'insecure' },
        mockEvent = { $event: { user: mockUser } };

      spyOn(AuthService, 'register').and.callFake(function() {
        return $q.when({$id: 1});
      });

      spyOn($state, 'go');

      var promise = controller.createUser(mockEvent);

      promise.then(function(result){
        expect(AuthService.register).toHaveBeenCalledWith(mockEvent.user);
        expect($state.go).toHaveBeenCalledWith('app');
      });

      $rootScope.$digest();
    });

    // Test if the register method of the AuthService will give an error on failed registration
    it('should set error on failed login ', function () {
      var mockUser = { email: 'test@test.com', password: 'insecure' },
        mockEvent = { $event: { user: mockUser } },
        mockMessage = 'Oh bollocks!';

      spyOn(AuthService, 'register').and.callFake(function() {
        return $q.reject({ message: mockMessage});
      });

      spyOn($state, 'go');

      var promise = controller.createUser({});

      promise.then(function(result){
        expect(AuthService.register).toHaveBeenCalledWith(mockEvent.user);
        expect(controller.error).toEqual(mockMessage);
        expect($state.go).not.toHaveBeenCalled();
      });

      $rootScope.$digest();
    });
  });
});