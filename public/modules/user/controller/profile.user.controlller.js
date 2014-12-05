'use strict';

angular.module('userModule').controller('profileUserControlller', ['registerUserConfigFactory', 'connectProductFactory', '$location', '$scope', function (registerUserConfigFactory, connectProductFactory, $location, $scope) {
	$scope.userInfo = registerUserConfigFactory.getUser();
	
	//if user is not logged then redirect to the sign in page
	if(!$scope.userInfo) $location.path('/signin');

	connectProductFactory.query(function (respone) {
		$scope.userProducts = respone;
	});

}]);