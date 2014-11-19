'user strict';

angular.module('homeModule').controller('indexHomeController', ['registerUserConfigFactory', '$scope', function (registerUserConfigFactory, $scope) {
	$scope.homeMsg = 'Here is the home';
	$scope.authMsg = 'Here is the Auth message';
	$scope.testMessage = registerUserConfigFactory;
}]);