var UrlService =  (function() {
  'use strict';

  var UrlService = function($http, $q){
    var o = {};

    // LOGIN
    o.retriveUrls = function(){
      var dfd = $q.defer();
			$http.get('http://localhost:3000/api/urls')
				.success(function(res){ console.log('url retrival success');
					dfd.resolve(res.data);
				})
				.error(function(error){ console.log('url retrival failed.');
					dfd.reject(error);
				});
			return dfd.promise;
    };

    return o;
  };

  return UrlService;

}());
