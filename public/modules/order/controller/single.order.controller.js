'use strict';

angular.module('orderModule').controller('singleOrderController', ['$scope', '$location', 'connectOrderFactory', '$stateParams', 'statusOrderFactory', function ($scope, $location, connectOrderFactory, $stateParams, statusOrderFactory) {
	$scope.statusOptions = statusOrderFactory.status;

	connectOrderFactory.get({productId: $stateParams.productId, id: $stateParams.id}, function (response) {
		$scope.orderInfo = response.order;
		$scope.productInfo = response.product;
		//get the current status and save as old so we can get it if the status
		//got updateed
		$scope.oldStatus = response.order.status;
	}, function (err) {
		$scope.error = err.data.message;
	});


	$scope.updateOrder = function () {
		var updateInfo = {
			status: $scope.orderInfo.status,
			statusHistory: {
				oldStatus: $scope.oldStatus,
				updateRemarks: $scope.updateRemarks
			}
		}
		connectOrderFactory.update({productId: $stateParams.productId, id: $stateParams.id}, updateInfo, function (response) {
			$scope.updateRemarks = '';
			$scope.success = response;
			$scope.orderInfo = response.order;
		}, function (err) {
			$scope.error = err.data.message;
		});
	}

}]);