// Write the main test suite for the contact-new component

describe('Contact', function () {
  // Load the module under which the contact-new was registerd, which is 'components.contact'
  beforeEach(module('components.contact', function ($provide) {
    $provide.value('cfpLoadingBar', { // Simulate the cfpLoadingBar service
      start: angular.noop,
      complete: angular.noop
    })

    // Simulate the ContactService
    $provide.value('ContactService', {
      createNewContact: angular.noop
    });
  }));

  // Load another module required 'components.auth' module
  beforeEach(module('components.auth'));

  // Load the $stateProvider and simulate the contacts state.
  beforeEach(module(function ($stateProvider) {
    $stateProvider.state('app', {
      redirectTo: 'contacts',
      url: '/app',
      data: {
        requiredAuth: true
      }
    });
  }));

  // Define the Routes test suite and set required properties
  describe('Routes', function () {
    var $state, $location, $rootScope, AuthService;

    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    // Inject the reqired angular services.
    beforeEach(inject(function ($injector) {
      $state = $injector.get('$state');
      $location = $injector.get('$location');
      $rootScope = $injector.get('$rootScope');
      AuthService = $injector.get('AuthService');
    }));

    // Assert if the url '/app/new' will redirect the user to the add a new contact route.
    it('should go to the contact state', function() {
      spyOn(AuthService, 'isAuthenticated').and.returnValue(true);

      goTo('/app/new');

      expect($state.current.name).toEqual('new')
    });
  });

  // Define the test suite for the 'ContactNewController' and set required properties
  describe('ContactNewController', function () {
    var $componentController,
      controller,
      $state,
      ContactService,
      $rootScope,
      $q;

    // Inject the angular services.
    beforeEach(inject(function ($injector) {
      $componentController = $injector.get('$componentController');
      $state = $injector.get('$state');
      ContactService = $injector.get('ContactService');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');

      //simulate the 'contactNew' component controller and pass to it the $scope and other dependencies
      controller = $componentController('contactNew',
        { $scope: {}, $state: $state, ContactService: ContactService }
      );
    }));

    // Assert if the createNewContact method of the ContactService will create a new contact when called.
    it('should create a contact', function () {
      var event = { contact: { email: 'test@test.com', password: 'insecure' } };
      spyOn(ContactService, 'createNewContact').and.callFake(
        function () {
          return $q.when({ key: 1})
        }
      );
      spyOn($state, 'go');

      var promise = controller.createNewContact(event);

      promise.then(function () {
        expect(ContactService.createNewContact).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('contact', {id: 1});
      });

      $rootScope.$digest();
    });
  });
});