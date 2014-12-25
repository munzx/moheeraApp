'user strict';

angular.module('userModule').directive('sidebarLogoUserDirective', [function  () {
	return {
		restrict: 'A',
		replace: true,
		transclude: true,
		scope: {
			user: '=sidebarLogoUserDirective'
		},
		link: function (scope, elem, attrs) {
			scope.$watch('user', function (value) {
				var logo;
				if(value){
					if(value.logo){
						logo = '<img style="margin-bottom:-2%;" class="img-responsive text-center" src="' + "public/uploads/" + value.logo + '">';
						elem.append(logo);
					} else {
						logo = '<span class="glyphicon glyphicon-user" style="font-size:164px;" aria-hidden="true"></span>';
						elem.append(logo);
					}
				}
			});
		}
	}
}]);