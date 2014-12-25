'use strict';

//Get the category of products
angular.module('userModule').directive('sidebarUserDirective', ['registerUserConfigFactory', '$stateParams', function (registerUserConfigFactory, $stateParams) {
	return {
		restrict: 'A',
		templateUrl: 'public/modules/user/view/sidebar.user.view.html',
		replace: true,
		transclude: true,
		scope: {
			product: '=sidebarUserDirective'
		},
		link: function (scope, elem, attrs) {
			scope.user = registerUserConfigFactory.getUser();
			scope.$watch('product', function (value) {
				var cats = [];
				if(value){
					value.forEach(function (item) {
						if(item){
							var profile;
							//if the category is not in the "cats" array then add it
							if(cats.indexOf(item.category) == -1){
								if(scope.user._id == item.user){
									profile = 'profile';
								} else {
									profile = scope.user.name;
								}
								cats.push({name: item.category, value: item.category, profile: profile});
							}
						}
					});
					scope.cats = cats;
				}
			});

			//show the active sidebar nav link
			scope.isActive = function (value) {
				if(value == $stateParams.category){
					return true;
				} else if(value == 'all' && !$stateParams.category){
					return true;
				}
			}
		}
	}
}]);