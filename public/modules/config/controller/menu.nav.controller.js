'use strict';

angular.module('moheera').controller('navMenu', ['$rootScope', '$scope', function ($rootScope, $scope) {
	//initiate the menu in mobile and tables in no collapse status
	$scope.navbarCollapsed = false;

	// Collapsing the menu after navigation
	$scope.$on('$stateChangeSuccess', function() {
		$scope.navbarCollapsed = false;
	});

	// Watch the user
	$rootScope.$watch('logged', function () {
		if($rootScope.logged){
			$scope.loggedLink = true;
			$scope.notLoggedLink = false;
		} else {
			$scope.loggedLink = false;
			$scope.notLoggedLink = true;
		}
	});

}]);
