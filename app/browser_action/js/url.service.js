(function(){
	'use strict';

	var UrlService = function($http, $q){
    var o = {};

    var BASEURL = "http://localhost:3000";

		// retrive urls
		o.retriveUrls = function(){
			var dfd = $q.defer();
			$http.get(BASEURL + '/api/urls')
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// retrive single url
		o.retriveUrl = function(urlId){
			var dfd = $q.defer();
			$http.get(BASEURL + '/api/urls/' + urlId)
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

    return o;
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('tbmp').factory('UrlService',[
    '$http',
		'$q',
		UrlService
	]);
})();
