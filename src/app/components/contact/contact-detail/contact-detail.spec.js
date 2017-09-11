// Write the main test suite for the contact-details component
describe('Contact', function () {
  // Load the module under which the contact-details component was registered.
  beforeEach(module('components.contact'));

  // Write a test suite for the 'ContactDetailController' and declare it's variables and properties
  describe('ContactDetailController', function () {
    var $componentController,
      controller,
      mockContact = { $id: 1 },
      mockSave = angular.noop,
      mockUpdate = angular.noop,
      mockDelete = angular.noop;

    // Inject the reqired angular services
    beforeEach(inject(function ($injector) {
      $componentController = $injector.get('$componentController');
      controller = $componentController('contactDetail',
        { $scope: {} },
        { contact: mockContact, onSave: mockSave, onUpdate: mockUpdate, onDelete: mockDelete }
      );
    }));

    // Assert that the controller's contact.id property matches the expected id value
    it('should bind to the correct contact', function () {
      expect(controller.contact.$id).toEqual(mockContact.$id);
      controller.$onInit();

      expect(controller.isNewContact).toBe(false);
    });


    // Assert that if not id is present in the contact on initialize, a new contact with a new id should be created
    it('should initialize isNewContact if no $id is present', function() {
      controller = $componentController('contactDetail',
        { $scope: {} },
        { contact: {}, onSave: mockSave, onUpdate: mockUpdate, onDelete: mockDelete }
      );
      controller.$onInit();

      expect(controller.isNewContact).toBe(true);
    });

    // Assert that the onSave method of the controller is called with the right payload when invoked
    it('should call onSave when saveContact is called', function () {
      var payload = { $event: { contact: mockContact } };

      spyOn(controller, 'onSave');
      controller.saveContact();
      expect(controller.onSave).toHaveBeenCalledWith(payload);
    });

    // Assert that the updateContact method of the controller is called with the right payload when invoked
    it('should call onUpdate when updateContact is called', function () {
      var payload = { $event: { contact: mockContact } };

      spyOn(controller, 'onUpdate');
      controller.updateContact();
      expect(controller.onUpdate).toHaveBeenCalledWith(payload);
    });

    // Assert that the deleteContact method of the controller is called with the right payload when invoked
    it('should call onDelete when deleteContact is called', function () {
      var payload = { $event: { contact: mockContact } };

      spyOn(controller, 'onDelete');
      controller.deleteContact();
      expect(controller.onDelete).toHaveBeenCalledWith(payload);
    });

    // Assert that tag changes when the tagChange method of the controller is called with an event object, and that it calls the updateContact method in turn.
    it('should save tag when tagChange is called', function () {
      var event = { tag: 'friend' };

      spyOn(controller, 'updateContact');
      controller.tagChange(event);
      expect(controller.updateContact).toHaveBeenCalled();
      expect(controller.contact.tag).toEqual(event.tag);
    });
  });
});