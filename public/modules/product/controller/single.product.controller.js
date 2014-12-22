'use strict';

angular.module('productModule').controller('singleProductController', ['$scope', '$stateParams', 'connectProductFactory', '$location', 'connectCommentProductFactory', 'registerUserConfigFactory', 'connectCartFactory', '$state', function ($scope, $stateParams, connectProductFactory, $location, connectCommentProductFactory, registerUserConfigFactory, connectCartFactory, $state) {
	$scope.user = registerUserConfigFactory.getUser();

	$scope.productName = $stateParams.name;

	connectProductFactory.get({getByName: $scope.productName}, function (response) {
		$scope.product = response;
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