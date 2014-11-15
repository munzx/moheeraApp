'user strict';

angular.module('homeModule').controller('indexHomeController', ['$scope', function ($scope, testf) {
	$scope.homeMsg = 'Here is the home';
	$scope.authMsg = 'Here is the Auth message';
	$scope.testMessage = 'Some Data';
}]);