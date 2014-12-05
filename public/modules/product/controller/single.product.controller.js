'use strict';

angular.module('productModule').controller('singleProductController', ['$scope', '$stateParams', 'connectProductFactory', '$location', 'connectCommentFactory', 'registerUserConfigFactory', function ($scope, $stateParams, connectProductFactory, $location, connectCommentFactory, registerUserConfigFactory) {
	$scope.user = registerUserConfigFactory.getUser();

	$scope.productName = $stateParams.name;

	connectProductFactory.get({getByName: $scope.productName}, function (response) {
		$scope.product = response;
	}, function (err) {
		$location.path('/notfound');
	});

	$scope.showRemoveProductBox = function () {
		$scope.removeProductBox = true;
	}

	$scope.removeProduct = function () {
		connectProductFactory.remove({id: $scope.product._id},function (response) {
			$location.path('/profile');
		}, function (err) {
			$scope.error = err.data.message;
		});
	}

	$scope.cancelRemoveProduct = function () {
		$scope.removeProductBox = false;
	}

	$scope.addComment = function () {
		if($scope.newComment){
			connectCommentFactory.save({id: $scope.product._id},{content: $scope.newComment}, function (response) {
				$scope.product.comment.push(response);
				$scope.newComment = '';
			}, function (err) {
				$scope.error = err.data.message;
			});
		}
	}

	$scope.removeComment = function (index, commentId, productId) {
		connectCommentFactory.remove({commentId: commentId, id: productId}, function (response) {
			$scope.product.comment.splice(index, 1);
		}, function (err) {
			$scope.error = err.data.message;
		});
	}

}]);