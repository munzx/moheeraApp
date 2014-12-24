'use strict';

angular.module('productModule').directive('productBoxProductDirective', [function () {
	return {
		restrict: 'A',
		templateUrl: 'public/modules/product/view/product.box.product.view.html',
		replace: true,
		transclude: true,
		scope: {
			product: '=productBoxProductDirective'
		}
	}
}]);