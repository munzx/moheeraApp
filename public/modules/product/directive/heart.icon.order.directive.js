'use strict';

angular.module('productModule').directive('heartIconProductDirective', ['registerUserConfigFactory', 'connectHeartProductFactory', function (registerUserConfigFactory, connectHeartProductFactory) {
	return {
		restrict: 'A',
		templateUrl: 'public/modules/product/view/heart.icon.product.view.html',
		replace: true,
		transclude: true,
		scope: {
			product: '=heartIconProductDirective'
		},
		link: function (scope, elem, attrs) {
			scope.$watch('product', function (value) {
				var user = registerUserConfigFactory.getUser();
				var getStatus = function () {
					if(value){
						if(value.heart.length > 0){
							var hearts = value.heart;
							//to access the heart 'owner' info embedded in the product retrieved from moheera api
							// product.heart[array].user[array].'info'
							for(var i=0;i <= hearts.length;i++){
								if(hearts[i].user[0]._id == user._id){
									return true;
								}
							}
						}
						return false;
					} else {
						return false;
					}
				}
				//update the 'isChecked' value
				scope.isChecked = getStatus();
			});

			//heart or unheart a prodcut
			//for some reason the product $watch above is not updating the
			// 'isChecked' variable so we do it manually
			scope.heartProduct = function (productId) {
				if(scope.isChecked == false){
					connectHeartProductFactory.save({productId: productId}, function (response) {
						scope.product.heart = response.heart;
						scope.isChecked = true;
					});
				} else {
					connectHeartProductFactory.remove({productId: productId}, function (response) {
						scope.product.heart = response.heart;
						scope.isChecked = false;
					});
				}
			}

		}
	}
}]);