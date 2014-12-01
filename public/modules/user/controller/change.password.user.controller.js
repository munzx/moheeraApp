'use strict';

angular.module('userModule').controller('changePasswordUserController', ['$scope', '$location', 'connectUserFactory', function ($scope, $location, connectUserFactory) {
	//Update user password
	$scope.changeUserPassword = function () {
		//Make sure no success or error messages are showed
		$scope.success = false;
		$scope.error = false;

		connectUserFactory.update({action: "password"},{newPassword: $scope.userInfo.newPassword, currentPassword: $scope.userInfo.currentPassword}, function (response) {
			$scope.success = true;
			//empty form fields
			$scope.userInfo.newPassword = '';
			$scope.userInfo.currentPassword = '';
			$scope.userInfo.verifyPassword = '';
		}, function (error) {
			$scope.error = error.data.message;
		});
	}

	//not working perfectly but does the job for now
	$scope.noMatch = function () {
		if($scope.userInfo.newPassword == $scope.userInfo.verifyPassword) {
			return false;
		} else {
			return true;	
		}
	}

}]);