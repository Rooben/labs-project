// Define the test suits for the auth-form component

describe('Auth', function(){

  // load the module under which the auth-form was registered, which is the 'components.auth' module.
  beforeEach(module('components.auth'));

  // Define the AuthFormController test suite
  describe('AuthFormController', function(){
    // Declare the variables required for this test.
    var $componentController,
      controller,
      mockUser = { $id: 1 },
      mockSubmit = angular.noop;

    // Load the angular-mocks $injector to be able to inject required services
    beforeEach(inject(function ($injector) {
      $componentController = $injector.get('$componentController'); // Inject the '$componentController' to this test suit

      // Create the controller to be tested by specifying the component in which the controller is bound...
      // and pass the $scope and other dependencies to it.
      controller = $componentController('authForm',
        { $scope: {} },
        { user: mockUser, button: '', message: '', onSubmit: mockSubmit }
      );
    }));

    // Write the spec
    // Assert if the controller called on it's onSubmit method with a payload
    it('should call onSelect with the correct payload', function () {
      var payload = { $event: { user: mockUser } };

      spyOn(controller, 'onSubmit');
      controller.submitForm();
      expect(controller.onSubmit).toHaveBeenCalledWith(payload);
    });
  });
});
