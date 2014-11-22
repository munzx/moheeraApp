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
			$scope.cartLink = true;
			$scope.profileLink = true;
			$scope.reportLink = true;
			$scope.orderLink = true;
			$scope.signOutLink = true;
			$scope.aboutLink = false;
			$scope.contactLink = false;
			$scope.signInLink = false;
			$scope.signUpLink = false;
		} else {
			$scope.cartLink = false;
			$scope.profileLink = false;
			$scope.reportLink = false;
			$scope.orderLink = false;
			$scope.signOutLink = false;
			$scope.signInLink = true;
			$scope.signUpLink = true;
			$scope.aboutLink = true;
			$scope.contactLink = true;
		}
	});

}]);
