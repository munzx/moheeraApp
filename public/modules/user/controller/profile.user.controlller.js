'use strict';

angular.module('userModule').controller('profileUserControlller', ['registerUserConfigFactory', '$location', '$scope', function (registerUserConfigFactory, $location, $scope) {
	$scope.userInfo = registerUserConfigFactory.getUser();
	
	if(!$scope.userInfo) $location.path('/signin');

}]);