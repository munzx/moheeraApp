'use strict';

//Get the category of products
angular.module('userModule').directive('sidebarUserDirective', ['registerUserConfigFactory', '$stateParams', 'connectProductFactory', '$state', function (registerUserConfigFactory, $stateParams, connectProductFactory, $state) {
	return {
		restrict: 'A',
		templateUrl: 'public/modules/user/view/sidebar.user.view.html',
		replace: true,
		transclude: true,
		scope: {
			product: '=sidebarUserDirective'
		},
		link: function (scope, elem, attrs) {
			//initiate needed variables
			var cats = [];
			var logo;
			var user = registerUserConfigFactory.getUser();
			//if the user is not visiting others page that means he/she is in his/her profile page
			//so assign profile to the profile variable
			scope.profile = ($stateParams.userName == undefined)? 'profile': $stateParams.userName;
			//if the user is not visiting others page that means he/she is in his/her profile page
			//so assign the user name to the userName variable
			scope.userName = ($stateParams.userName == undefined)? user.name: $stateParams.userName;

			scope.$watch('product', function (value) {
				if(value){
					//get the user categories
					connectProductFactory.get({action: 'category', userName: scope.userName}, function (respone) {
						scope.user = respone.user || user;
						//create the categroy list along with necessary info for the nav required
						//by the "isActive" function in order for it to work properly
						var categoryList = respone.category;
						if(categoryList){
							categoryList.forEach(function (elem) {
								cats.push({name: elem, value: elem, profile: scope.profile});		
							});
							scope.cats = cats;
						}
						//create the html elment with the image link and assign in to "logo" variable
						//or if the user has no logo then assign a placeholder vector image to the logo variable 
						if(scope.user.logo){
							logo = '<div class="row" style="background-color:#fff;padding-bottom:10%;"><a href="#/'+ scope.user.name +'"><img style="margin-bottom:-2%;" class="img-responsive col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1  text-center" src="' + "public/uploads/" + scope.user.logo + '"></a></div>';
						} else {
							logo = '<div class="row" style="background-color:#fff;padding-bottom:10%;"><a href="#/'+ scope.user.name +'"><span class="glyphicon glyphicon-user img-responsive text-center" style="font-size:164px;color: #cccccc;" aria-hidden="true"></span></a></div>';
						}
						//embed the logo at the top of the sidebar
						elem.parent().prepend(logo);
					});
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