'use strict';

angular.module('app').controller('postCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.tabList = [{
		id: 'all',
		name: '全部'
	},{
		id: 'pass',
		name: '面试通知'
	},{
		id: 'fail',
		name: '不合适'
	}];

	$http({
		method: 'GET',
		url: '/data/myPost.json'
	}).then(function(success) {
		$scope.positionList = success.data;
	});
	
	$scope.filterObj = {};
	
	$scope.tClick = function(id, name) {
	  switch (id) {
	    case 'all':
	      delete $scope.filterObj.state;
	      break;
	    case 'pass':
	      $scope.filterObj.state = '1';
	      break;
	    case 'fail':
	      $scope.filterObj.state = '-1';         
	      break;
	    default:

	  }
	}
}]);