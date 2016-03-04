var AuthInterceptor =  (function() {
  'use strict';

  var AuthInterceptor = function($rootScope, $q, $window, Auth){
    var o = {};

    o.request = function (config) {
        var auth = new Auth($window, jwtHelper);
  			var token = auth.getToken();
  			if (token) {
  				config.headers = config.headers || {};
  				config.headers.Authorization = 'Bearer ' + token;
  			}
  			return config;
  		};

  	o.responseError = function (rejection) {
  	  if (rejection.status === 401) {
  		// handle the case where the user is not authenticated
  		console.warn('user not authenticated', rejection);
  	  }
  	  return $q.reject(rejection);
  	};

    return o;
  };

  return AuthInterceptor;

}());
