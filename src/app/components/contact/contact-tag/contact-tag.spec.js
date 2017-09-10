// Write the main test suit for the contag tag
describe('Contact', function () {
  // Load the 'components.contact' module
  beforeEach(module('components.contact'));

  // 'ContactController' test suite
  describe('ContactController', function () {
    // Declare variable and properties
    var $componentController,
      controller,
      mockTag = 'friends',
      mockChange = angular.noop;

    // Inject the angular services required for this test and pass in the $scope dependencies
    beforeEach(inject(function ($injector) {
      $componentController = $injector.get('$componentController');
      controller = $componentController('contactTag',
        { $scope: {} },
        { tag: mockTag, onChange: mockChange }
      );
    }));

    // Test if the controller.tag will bind the correct tag defined('football')
    it('should bind to the correct tag', function () {
      var mockTag = 'football';
      controller.tag = mockTag;
      expect(controller.tag).toEqual(mockTag);
    });

    // Test if the controller' tag property was updated on tag change.
    it('should call onSelect with the correct payload', function () {
      var tag = 'mate',
        payload = { $event: { tag: tag }};

      spyOn(controller, 'onChange');
      controller.updateTag(tag);
      expect(controller.onChange).toHaveBeenCalledWith(payload);
    });
  });
});
