'use strict';

angular.module('moheera').directive('watchImageConfigDirective', [function () {
	return {
		restrict: 'A',
		replace: false,
		transclude: false,
		scope: {
			"id": "@id"
		},
		link: function (scope, elem, attrs) {
			document.getElementById(scope.id + 'Preview').onclick = function () {
				document.getElementById(scope.id).click();
			}
			elem.bind('change', function (e) {
            var reader = new FileReader();
            
            reader.onload = function (image) {
            	var path = image.target.result;
            	document.getElementById(scope.id + 'Preview').setAttribute('src', path);
            }
            reader.readAsDataURL(elem[0].files[0]);
			});
		}
	}
}]);