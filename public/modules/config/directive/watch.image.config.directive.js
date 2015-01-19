'use strict';

angular.module('moheera').directive('watchImageConfigDirective', [function () {
	return {
		restrict: 'A',
		replace: false,
		transclude: false,
		link: function (scope, elem, attrs) {
			elem.bind('change', function () {
				console.log(document.getElementById('image1').value);
			});
		}
	}
}]);