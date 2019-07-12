(function(){
	var fenleiRouter = angular.module('fenleiRouter',[])
	.config(function($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl: 'feileiM.html',
				controller: 'fenleiMController'
			});
	})
})();