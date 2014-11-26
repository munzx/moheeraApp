'use strict';

angular.module('reportModule').controller('allReportController', ['$scope', '$location', function ($scope, $location) {

	$scope.productView = {
		dataset:[
			{
				'day': '2013-01-02_00:00:00',
				'sales': 13461.295202,
				'income': 12365.053
			},
			{
				'day': '2014-01-02_00:00:00',
				'sales': 1346.202,
				'income': 1235.3
			},
			{
				'day': '2015-01-02_00:00:00',
				'sales': 161.295202,
				'income': 1365.053
			}
		],
		schema: {
			day: {
				type: 'datetime',
				format: '%Y-%m-%d_%H:%M:%S',
				name: 'Date'
			}
		},
		options: {
			rows: [{
				key: 'income',
				type: 'bar'
			}, {
				key: 'sales'
			}],
			xAxis: {
				key: 'day',
				displayFormat: '%Y-%m-%d %H:%M:%S'
			}
		}
	};

	$scope.productSaleByCategory = {
		dataset:[
			{
				'day': '2013-01-02_00:00:00',
				'sales': 13461.295202,
				'income': 12365.053
			},
			{
				'day': '2014-01-02_00:00:00',
				'sales': 1346.202,
				'income': 1235.3
			},
			{
				'day': '2015-01-02_00:00:00',
				'sales': 161.295202,
				'income': 1365.053
			}
		],
		schema: {
			day: {
				type: 'datetime',
				format: '%Y-%m-%d_%H:%M:%S',
				name: 'Date'
			}
		},
		options: {
			rows: [{
				key: 'income',
				type: 'pie'
			}, {
				key: 'sales'
			}],
			xAxis: {
				key: 'day',
				displayFormat: '%Y-%m-%d %H:%M:%S'
			}
		}
	};



}]);