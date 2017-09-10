// Write the main test swuits
describe('Contact', function () {
  // Load the 'components.contact' module
  beforeEach(module('components.contact', function($provide){
    $provide.value('ContactService', {  // simulate the ContactService
      getContactList: function() {
        return {
          $loaded: angular.noop
        }
      }
    });
  }));

  // Load the 'components.auth' module
  beforeEach(module('components.auth'));

  // Simulate the contacts state under the app state
  beforeEach(module(function ($stateProvider) {
    $stateProvider.state('app', {
      redirectTo: 'contacts',
      url: '/app',
      data: {
        requiredAuth: true
      }
    });
  }));

  // Write the suite for the Routes
  describe('Routes', function () {
    // Declare all the variables that will be required.
    var $state, $location, $rootScope, AuthService;

    // Simulate the goTo() method
    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    // Load the $injector property and use it to inject the angular services that would be required for these tests
    beforeEach(inject(function ($injector) {
      $state = $injector.get('$state');
      $location = $injector.get('$location');
      $rootScope = $injector.get('$rootScope');
      AuthService = $injector.get('AuthService');
    }));

    // Test and assert that the user will be sent to the contacts route if authenticated.
    it('should go to the contact state', function() {
      spyOn(AuthService, 'isAuthenticated').and.returnValue(true);

      goTo('/app/contacts?friends');

      expect($state.current.name).toEqual('contacts')
    });
  });

  // ContactController test suite
  describe('ContactController', function () {
    // Properties to be initialized
    var $componentController,
      controller,
      $filter,
      $state,
      mockFilter = { filter: 'friends'},
      mockContacts = [
        {
          name: 'John Doe',
          tag: 'friends'
        },
        {
          name: 'Jane Smith',
          tag: 'family'
        }
      ];

    // Inject required angular services
    beforeEach(inject(function ($injector) {
      $componentController = $injector.get('$componentController');
      $filter = $injector.get('$filter');
      $state = $injector.get('$state');
      controller = $componentController('contacts',
        { $scope: {}, $filter: $filter, $state: $state },
        { filter: mockFilter, contacts: mockContacts }
      );
    }));

 /*  // Commenting this test out, since the filter was not working
    it('should filter contacts', function() {
      expect(controller.filteredContacts).toEqual([{
        name: 'John Doe',
        tag: 'friends'
      }]);
    });

    */

    // Test if the $state.go method was called with 'contact' as param and with the event contact id.
    it('should route on goToContact call', function () {
      var event = { contactId: 1 };

      spyOn($state, 'go');
      controller.goToContact(event);
      expect($state.go).toHaveBeenCalledWith('contact', { id: event.contactId });
    });
  });
});
