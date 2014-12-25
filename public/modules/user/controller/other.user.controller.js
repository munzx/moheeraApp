'use strict';

angular.module('userModule').controller('otherUserControlller', ['registerUserConfigFactory', 'connectProductFactory', '$location', '$scope', '$stateParams', function (registerUserConfigFactory, connectProductFactory, $location, $scope, $stateParams) {
	
	connectProductFactory.get({action: 'all', getByName: $stateParams.userName}, function (respone) {
		$scope.userProducts = respone.product;
		$scope.userInfo = respone.user;

		//if user is not logged then redirect to the sign in page
		if(!$scope.userInfo) $location.path('/signin');

		$scope.banner = function () {
			if($scope.userInfo.length > 0){
				if($scope.userInfo.banner){
					return 'public/uploads/' + $scope.userInfo.banner;
				} else {
					return 'public/modules/config/img/banner.jpg';
				}
			} else {
				return 'public/modules/config/img/banner.jpg';
			}
		}
	}, function (err) {
		$location.path('/notfound');
	});



}]);