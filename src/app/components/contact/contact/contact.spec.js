// Define the test suite for the contact component

describe('Contact', function () {
  // Load the module under which the contact component was registered
  beforeEach(module('components.contact'));

  // Write the 'Controller' test suite and declare it's properties and variables
  describe('Controller', function () {
    var $componentController,
      controller,
      mockContact = { $id: 1 },
      mockSelect = angular.noop;

    // Inject the angular services required for the tests
    beforeEach(inject(function ($injector) {
      $componentController = $injector.get('$componentController');
      controller = $componentController('contact',
        { $scope: {} },
        { contact: mockContact, onSelect: mockSelect }
      );
    }));

    // Assert that the contact.id property of the controller loads the proper contact id.
    it('should bind to the correct contact', function () {
      expect(controller.contact.$id).toEqual(mockContact.$id);
    });

    // Assert that the selectedContact method of the controller calls onSelect callback with the proper payload.
    it('should call onSelect with the correct payload', function () {
      var payload = { $event: { contactId: mockContact.$id } };

      spyOn(controller, 'onSelect');
      controller.selectContact();
      expect(controller.onSelect).toHaveBeenCalledWith(payload);
    });
  });
});