var UserService =  (function() {
  'use strict';

  var UserService = function($http, $q, auth){
    var o = {};

    // LOGIN
    o.login = function(credentials){ console.log('inside login service.');
      var dfd = $q.defer();
			$http.post('http://localhost:3000/login', credentials)
				.success(function(res){ console.log('login success');
					auth.setToken(res.token);
					dfd.resolve(res);
				})
				.error(function(error){ console.log('login failed.');
					auth.clearToken();
					dfd.reject(error);
				});
			return dfd.promise;
    };

    return o;
  };

  return UserService;

}());
