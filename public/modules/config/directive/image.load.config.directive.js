'use strict';

angular.module('moheera').directive('imageLoadConfigDirective', [function () {
	return {
		restrict: 'A',
		replace: true,
		transclude: true,
		link: function (scope, elem, attrs) {
			var element = elem[0];
			element.onLoad = console.log('Bism Allah');
			//elem.parent().prepend('<img src="/public/modules/home/img/loading.gif"/>');
			console.log(attrs['ngSrc']);
			element.complete = console.log('done');
			console.log(elem[0]);
		}
	}
}]);