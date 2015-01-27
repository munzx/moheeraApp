'use strict';

angular.module('moheera').directive('watchImageConfigDirective', ['$modal', '$rootScope', function ($modal, $rootScope) {
	return {
		require: '?ngModel',
		restrict: 'A',
		replace: false,
		transclude: false,
		scope: {
			"id": "@id"
		},
		link: function (scope, elem, attrs, ngModel) {
			var oldSrc = document.getElementById(scope.id + 'Preview').getAttribute('src');
			var loadingGif = 'public/modules/home/img/loading.gif';

			document.getElementById(scope.id + 'Preview').onclick = function () {
				document.getElementById(scope.id).click();
			}

			elem.bind('change', function (e) {
				scope.$apply(function () {
					ngModel.$setViewValue(elem.val());
					ngModel.$render();
				});

				var reader = new FileReader();
				reader.onloadstart = function (image) {
					document.getElementById(scope.id + 'Preview').setAttribute('src', loadingGif);
				}

				console.log(reader);
				reader.onabort = function (image) {
					document.getElementById(scope.id + 'Preview').setAttribute('src', path);	
				}

				reader.onload = function (image) {
					if(image.loaded > 1024 * 1024){
						ngModel.$setValidity("file loaded", false);
						ngModel.$render();
						document.getElementById(scope.id + 'Preview').setAttribute('src', oldSrc);
						var modalInstance = $modal.open({
							controller: function () {
								$rootScope.cancel = function () {
									modalInstance.dismiss('cancel');
								}
							},
							template: '<button ng-click="cancel()" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="alert alert-danger text-center">Maximum image size is 1MB</h4>'
						});
					} else {
						scope.$apply(function () {
							ngModel.$setValidity("file loaded", true);
							ngModel.$render();
						});
						var path = image.target.result;
						document.getElementById(scope.id + 'Preview').setAttribute('src', path);
					}
				}
				reader.readAsDataURL(elem[0].files[0]);
			});
	}
}
}]);