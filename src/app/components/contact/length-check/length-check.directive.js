// Create a directive called 'lengthCheck' and register it under  the 'component.contact' module
// This directive will be used to manipulate the DOM, just by making the input field transparent.
function lengthCheck() {
  return {
    restrict: 'A',
    require: 'ngModel', // require the ngModel in the link function so as to bind to the parent scope.
    compile: function ($element) {
      $element.addClass('dynamic-input'); // A class is added to the element before it gets rendered, and as such will be added only once.
      return function ($scope, $element, $attrs, $ctrl) { // Returns the link function that gets run after the directive has been created.
        var dynamicClass = 'dynamic-input--no-contents';
        $scope.$watch(function () { // Watches the current input value, and if the value changed, will remove the 'dynamic-input' class, else will keep it.
          return $ctrl.$viewValue;
        }, function (newValue) {
          if (newValue) {
            $element.removeClass(dynamicClass);
          } else {
            $element.addClass(dynamicClass);
          }
        });
      };
    }
  };
}

angular
  .module('components.contact')
  .directive('lengthCheck', lengthCheck);
