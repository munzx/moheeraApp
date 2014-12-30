'use strict';

angular.module('userModule').controller('settingUserController', ['$scope', '$location', 'connectUserFactory', function ($scope, $location, connectUserFactory) {
	$scope.removeAccount = function () {
		$location.path('/profile/remove');
	}

	$scope.updateAccount = function () {
		// userInfo is inherted from the profile controller , this is due to the fact
		// that this conntroller is child controller of the profile controller , this is
		// done through the ui-router
		var fd = new FormData();
		fd.append('logo', document.getElementById('logo').files[0]);
		fd.append('banner', document.getElementById('banner').files[0]);
		fd.append('firstName', $scope.userInfo.firstName);
		fd.append('lastName', $scope.userInfo.lastName);
		fd.append('email', $scope.userInfo.email);
		fd.append('mobilePhone', $scope.userInfo.mobilePhone);
		fd.append('pageDesc', $scope.userInfo.pageDesc);

		connectUserFactory.update(fd, function (response) {
			$scope.success = true;
		}, function (error) {
			$scope.error = error.data.message;
		});
	}

}]);