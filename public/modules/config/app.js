'use strict';

// intitiate the app and Inject all of the app module dependencies
//configure the routes
var moheera = angular.module('moheera', ['ui.bootstrap', 'ui.router', 'ngResource', 'authModule', 'homeModule', 'userModule', 'productModule']);

//RouteScopes & Routes Configurations
moheera.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
	$urlRouterProvider.otherwise('notfound');
	$stateProvider
		.state('notfound',{
			url: '/notfound',
			templateUrl: 'public/modules/config/view/notfound.config.view.html',
			controller: 'errorConfigController'
		})
		.state('home', {
			url: '',
			templateUrl: 'public/modules/home/view/index.home.view.html',
			controller: 'indexHomeController'
		})
		.state('contact', {
			url: '/contact',
			templateUrl: 'public/modules/home/view/contact.home.view.html',
			controller: 'indexHomeController'
		})
		.state('about', {
			url: '/about',
			templateUrl: 'public/modules/home/view/about.home.view.html',
			controller: 'indexHomeController'
		})
		.state('signin', {
			url: '/signin',
			templateUrl: 'public/modules/auth/view/signin.auth.view.html',
			controller: 'signinAuthController'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'public/modules/auth/view/signup.auth.view.html',
			controller: 'signupAuthController'
		})
		.state('signout', {
			url: 'signout',
			controller: 'signoutAuthController'
		})
		.state('profile', {
			url: '/profile',
			templateUrl: 'public/modules/user/view/profile.user.view.html',
			controller: 'profileUserControlller'
		})
		.state('profile.singleProduct', {
			url: '/product/:id',
			templateUrl: 'public/modules/product/view/single.product.view.html',
			controller: 'profileUserControlller'
		})
		.state('user', {
			url: '/:id',
			templateUrl: 'public/modules/user/view/profile.user.view.html',
			controller: 'profileUserControlller'
		})
		.state('user.singleProduct', {
			url: '/:userId/productId',
			templateUrl: 'public/modules/user/view/profile.user.view.html',
			controller: 'profileUserControlller'
		});
}])
.run(['$rootScope', function ($rootScope) {
	$rootScope.logged = false;
}]);