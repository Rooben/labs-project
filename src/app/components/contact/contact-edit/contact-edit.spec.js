// Write the main test suite for the contact-edit component
describe('Contact', function () {
  // Load the 'components.auth') module required to test this component
  beforeEach(module('components.auth'));

  // Load the module under which the contact-edit component was registered: ('components.contact')
  beforeEach(module('components.contact', function ($provide) {
    // Simulate the ContactService and it's dependencies
    $provide.value('ContactService', {
      updateContact: angular.noop,
      deleteContact: angular.noop,
      getContactById: function() {
        return {
          $loaded: angular.noop
        }
      }
    });

    $provide.value('cfpLoadingBar', {
      start: angular.noop,
      complete: angular.noop
    })

    $provide.value('$window', {
      confirm: function() { return true; }
    })
  }));


  // Simulate the app state containing the redirect to the 'contacts' state.
  beforeEach(module(function ($stateProvider) {
    $stateProvider.state('app', {
      redirectTo: 'contacts',
      url: '/app',
      data: {
        requiredAuth: true
      }
    });
  }));

  describe('Routes', function () {
    var $state, $location, $rootScope, AuthService;

    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    // Inject the angular services
    beforeEach(inject(function ($injector) {
      $state = $injector.get('$state');
      $location = $injector.get('$location');
      $rootScope = $injector.get('$rootScope');
      AuthService = $injector.get('AuthService');
    }));

    // Assert if the the url: ''/app/contact/1'' willl redirect to the 'contact' state for the user with the id=1
    it('should go to the contact state', function() {
      spyOn(AuthService, 'isAuthenticated').and.returnValue(true);

      goTo('/app/contact/1');

      expect($state.current.name).toEqual('contact');
    });
  });

  // Define the 'ContactDetailController' test suite and declare it's variables
  describe('ContactDetailController', function () {
    var $componentController,
      controller,
      $state,
      ContactService,
      cfpLoadingBar,
      $rootScope,
      $q,
      mockContact = { $id: 1 };

    // Inject the angular services required for the tests.
    beforeEach(inject(function ($injector) {
      $componentController = $injector.get('$componentController');
      $state = $injector.get('$state');
      ContactService = $injector.get('ContactService');
      cfpLoadingBar = $injector.get('cfpLoadingBar');
      $window = $injector.get('$window');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');

      // define the 'contactEdit' component controller and inject it's dependencies
      controller = $componentController('contactEdit',
        { $scope: {}, $state: $state, ContactService: ContactService, cfpLoadingBar: cfpLoadingBar },
        { contact: mockContact }
      );
    }));

    // Assert whether the updateContact method of the ContactService will update the contact when called
    it('should update contact', function () {
      var event = { contact: { $id: 1 }};
      spyOn(cfpLoadingBar, 'start');
      spyOn(cfpLoadingBar, 'complete');
      spyOn(ContactService, 'updateContact').and.callFake(
        function () {
          return $q.when({})
        }
      );

      var promise = controller.updateContact(event);

      expect(cfpLoadingBar.start).toHaveBeenCalled();

      promise.then(function () {
        expect(ContactService.updateContact).toHaveBeenCalled();
        expect(cfpLoadingBar.complete).toHaveBeenCalled();
      });

      $rootScope.$digest();
    });

    // Assert whether the deleteContact method of the ContactService will delete the specified contact when called
    it('should delete contact', function () {
      var event = { contact: { $id: 1, name: 'John Smith' }};
      spyOn($state, 'go');

      spyOn(ContactService, 'deleteContact').and.callFake(
        function () {
          return $q.when({})
        }
      );

      var promise = controller.deleteContact(event);

      promise.then(function () {
        expect($state.go).toHaveBeenCalledWith('contacts');
      });

      $rootScope.$digest();
    });
  });
});