'use strict';

angular.module('moheera').controller('userConfigController', ['registerUserConfigFactory', '$scope', function (registerUserConfigFactory, $scope) {
	$scope.registerUser = registerUserConfigFactory;
}]);