'use strict';

angular.module('userModule').controller('profileUserControlller', ['registerUserConfigFactory', '$location', '$scope', function (registerUserConfigFactory, $location, $scope) {
	$scope.userInfo = registerUserConfigFactory.getUser();
	
	//if user is not logged then redirect to the sign in page
	if(!$scope.userInfo) $location.path('/signin');

}]);