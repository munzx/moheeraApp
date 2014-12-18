'use strict';

angular.module('productModule').controller('singleProductController', ['$scope', '$stateParams', 'connectProductFactory', '$location', 'connectCommentProductFactory', 'registerUserConfigFactory', 'connectHeartProductFactory', 'connectCartFactory', '$state', function ($scope, $stateParams, connectProductFactory, $location, connectCommentProductFactory, registerUserConfigFactory, connectHeartProductFactory, connectCartFactory, $state) {
	$scope.user = registerUserConfigFactory.getUser();

	$scope.productName = $stateParams.name;

	connectProductFactory.get({getByName: $scope.productName}, function (response) {
		$scope.product = response;
		$scope.isHearted = function () {
			if(response.heart.length > 0){
				if(response.heart[0].user[0]._id == $scope.user._id){
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
		//something strange ,,,, this get called more than once!!!
		$scope.isInCart = function () {
			if($scope.user.cart.length > 0){
		 		for (var i=0; i < $scope.user.cart.length; i++) {
		 			if($scope.user.cart[i].productId == response._id){
						return true;
					}
				}
	 		}
	 		return false;
		}
	}, function (err) {
		$location.path('/notfound');
	});

	$scope.showRemoveProductBox = function () {
		$scope.removeProductBox = true;
	}

	$scope.removeProduct = function () {
		connectProductFactory.remove({id: $scope.product._id},function (response) {
			//go to profile page , use the state and pass empty parameter to reload the controller
			$state.go('profile', {}, {reload: true});
		}, function (err) {
			$scope.error = err.data.message;
		});
	}

	$scope.cancelRemoveProduct = function () {
		$scope.removeProductBox = false;
	}

	$scope.addComment = function () {
		if($scope.newComment){
			connectCommentProductFactory.save({id: $scope.product._id},{content: $scope.newComment}, function (response) {
				$scope.product.comment.push(response);
				$scope.newComment = '';
			}, function (err) {
				$scope.error = err.data.message;
			});
		}
	}

	$scope.removeComment = function (index, commentId, productId) {
		connectCommentProductFactory.remove({commentId: commentId, id: productId}, function (response) {
			$scope.product.comment.splice(index, 1);
		}, function (err) {
			$scope.error = err.data.message;
		});
	}

	$scope.heartProduct = function (productId) {
		if($scope.isHearted() == false){
			connectHeartProductFactory.save({productId: productId}, function (response) {
				$scope.product.heart = response.heart;
			});
		} else {
			connectHeartProductFactory.remove({productId: productId}, function (response) {
				$scope.product.heart = response.heart;
			});
		}
	}

	$scope.addToCart = function (product) {
		if($scope.isInCart() == false && product.quantity >= 1){
			connectCartFactory.save({productId: product._id, product: product}, function (response) {
				$scope.user.cart = response.cart;
			});
		} else {
			connectCartFactory.remove({productId: product._id}, function (response) {
				$scope.user.cart = response.cart;
			});
		}
	}

}]);