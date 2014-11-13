'user strict';

angular.module('homeController', [])
.controller('homepage', ['$scope', function ($scope) {

	$scope.homeMsg = 'Here is the home';
	$scope.authMsg = 'Here is the Auth message';
	$scope.testMessage = 'testMessage, from the new file structure';


}]);