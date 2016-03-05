var app = angular.module('app', ['angular-cache','ngLodash', 'angular-jwt']);

app.factory('AuthInterceptor', function ($rootScope, $q, $window, jwtHelper) {
	  return {
		request: function (config) {
      var auth = new Auth($window, jwtHelper);
      var token = auth.getToken();
			if (token) {
				config.headers = config.headers || {};
				config.headers.Authorization = 'Bearer ' + token;
			}
			return config;
		},
		responseError: function (rejection) {
		  if (rejection.status === 401) {
			// handle the case where the user is not authenticated
			console.warn('user not authenticated', rejection);
		  }
		  return $q.reject(rejection);
		}
	  };
	});

/* ==========================================================
	Config block
============================================================ */
app.config(function(CacheFactoryProvider, $httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
  angular.extend(CacheFactoryProvider.defaults, { storagePrefix: 'tbmpExtension.caches.', maxAge: 150 * 600 * 10000 , deleteOnExpire: 'aggressive'});
});

/* ==========================================================
	Run block
============================================================ */
app.run(function($rootScope, $window, jwtHelper, $http, $q, CacheFactory, lodash) {
  var _this = this;

  CacheFactory("topicsCache", {storageMode: 'localStorage', maxAge: 6000 * 6000 * 1000});
  CacheFactory("tagsCache", {storageMode: 'localStorage', maxAge: 6000 * 6000 * 1000});
  CacheFactory("urlsCache", {storageMode: 'localStorage', maxAge: 6000 * 6000 * 1000});

  var topicsCache = CacheFactory.get('topicsCache');
  var tagsCache = CacheFactory.get('tagsCache');
  var urlsCache = CacheFactory.get('urlsCache');

  var getCache = new GetCache('Naveen Kumar', $http);
  getCache.all({ topicsCache: topicsCache, tagsCache: tagsCache, urlsCache: urlsCache });

// MESSAGE LISTENER
  chrome.extension.onMessage.addListener(function(request, sender, sendResponse){

		// SAVE -------------------------------------------------
    if(request.messageName == "prepareData"){ console.log('url save request received.');
      saveUrl(request, lodash, tagsCache, urlsCache, topicsCache, $http);
      return true;
    }

		// RETRIVE URLS -------------------------------------------
    if(request.messageName == "retriveUrls"){ console.log('retriveUrls request received.');
			var urlService = new UrlService($http, $q, auth);
			urlService.retriveUrls().then(function(response){ console.log("sending response to popup.");
				sendResponse({ message: 'Success', data: response.data});
			}, function(error){ console.log("sending response to popup.");
				sendResponse({ message: 'Erro', data: error});
			});
    }

		// LOGIN -------------------------------------------------
		if(request.messageName == "login"){ console.log('Login request received.');
			var loginCredentials = {
				username: request.data.username,
				password: request.data.password
			};
			var auth = new Auth($window, jwtHelper);
			var userService = new UserService($http, $q, auth);
			userService.login(loginCredentials).then(function(response){ console.log("sending response to popup.");
				sendResponse({ message: 'Login Successful', data: response.data});
			}, function(error){ console.log("sending response to popup.");
				sendResponse({ message: 'Login Failed', data: error});
			});
			return true;
		}
  });

});
