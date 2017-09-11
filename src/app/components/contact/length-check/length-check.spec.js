// Write the main test suite for the length-check directive
describe('Contact', function () {
  // Load the module under which the length-check directive was registered
  beforeEach(module('components.contact'));

  // Write the test suite for the 'lengthCheck' directive and declare it's variables
  describe('lengthCheck', function () {
    var $rootScope,
      $compile,
      element;

    // Inject the required angular services for these tests
    beforeEach(inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');

      // Initialize the the contact property of the $rootScope
      $rootScope.contact = { name: '' };

      // Define the angular element to which the directive is bound.
      element = angular.element('<input name="name" type="text" length-check ng-model="contact.name"></input>');

      // Simulte the angular $compile method which builds the angular element into the DOM agains the $rootScope
      $compile(element)($rootScope);

      // Call $rootScope.$digest() to simulate DOM compiled changes update.
      $rootScope.$digest();

    }));

    // Asset that the directive element has the class 'dynamic-input'
    it('should contain dynamic-input class', function() {
      expect(element.hasClass('dynamic-input')).toEqual(true);
    });

    // Assert that the directive compiles with all the key DOM contents.
    it('should dynamically add dynamic-input--no-contents class', function() {
      var scope = element.scope();

      element.val('John Doe').triggerHandler('input');
      scope.$apply();

      expect(scope.contact.name).toBe('John Doe');
      expect(element.hasClass('dynamic-input--no-contents')).toEqual(false);

      element.val('').triggerHandler('input');
      scope.$apply();

      expect(scope.contact.name).toBe('');
      expect(element.hasClass('dynamic-input--no-contents')).toEqual(true);
    });
  });
});