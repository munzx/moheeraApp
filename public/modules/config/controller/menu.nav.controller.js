'use strict';

angular.module('moheera').controller('navMenu', ['$rootScope', '$scope', 'registerUserConfigFactory', function ($rootScope, $scope, registerUserConfigFactory) {
	//initiate the menu in mobile and tables in no collapse status
	$scope.navbarCollapsed = false;

	// Collapsing the menu after navigation
	$scope.$on('$stateChangeSuccess', function() {
		$scope.navbarCollapsed = false;
	});

  $scope.status = {
    isopen: false
  }

   $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  }


	// Watch the user
	$rootScope.$watch('logged', function () {
		if($rootScope.logged){
			//get the current user data
			$scope.user = registerUserConfigFactory.getUser();
			$scope.loggedLink = true;
			$scope.notLoggedLink = false;
		} else {
			$scope.loggedLink = false;
			$scope.notLoggedLink = true;
		}
	});

}]);
