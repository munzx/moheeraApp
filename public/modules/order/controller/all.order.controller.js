'use stritc';

angular.module('orderModule').controller('allOrderController', ['$scope', '$location', 'registerUserConfigFactory', 'connectOrderFactory', function ($scope, $location, registerUserConfigFactory, connectOrderFactory) {
	$scope.user = registerUserConfigFactory.getUser();

	connectOrderFactory.query(function (response) {
		$scope.orderInfo = response;
		console.log(response);
	}, function (err) {
		$scope.error = err.data.message;
	})

}]);