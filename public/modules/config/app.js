'use strict';

// intitiate the app and Inject all of the app module dependencies
//configure the routes
var moheera = angular.module('moheera', ['ui.bootstrap', 'ui.router', 'angularChart','ngResource', 'authModule', 'homeModule', 'userModule', 'productModule', 'orderModule', 'cartModule', 'reportModule']);

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
			controller: 'profileUserControlller',
		})
		.state('profile.setting', {
			url:'/setting',
			templateUrl: 'public/modules/user/view/setting.user.view.html',
			controller: 'settingUserController'
		})
		.state('profile.userPassword', {
			url: '/account/password',
			templateUrl: 'public/modules/user/view/change.password.user.view.html',
			controller: 'changePasswordUserController'
		})
		.state('profile.report', {
			url: '/report',
			templateUrl: 'public/modules/report/view/all.report.view.html',
			controller: 'allReportController'
		})
		.state('profile.singleOrder', {
			url: '/order/:id',
			templateUrl: 'public/modules/order/view/single.order.view.html',
			controller: 'singleOrderController'
		})
		.state('profile.order', {
			url: '/order',
			templateUrl: 'public/modules/order/view/all.order.view.html',
			controller: 'allOrderController'
		})
		.state('profile.addProduct', {
			url: '/product/add',
			templateUrl: 'public/modules/product/view/add.product.view.html',
			controller: 'addProductController'
		})
		.state('profile.editProduct', {
			url: '/product/:id/edit',
			templateUrl: 'public/modules/product/view/edit.product.view.html',
			controller: 'profileUserControlller'
		})
		.state('profile.singleProduct', {
			url: '/product/:id',
			templateUrl: 'public/modules/product/view/single.product.view.html',
			controller: 'singleProductController'
		})
		.state('profile.cart', {
			url: '/cart',
			templateUrl: 'public/modules/cart/view/all.cart.view.html',
			controller: 'allCartController'
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