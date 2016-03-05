(function() {
  'use strict';
	var LoginCtrl = function($window, jwtHelper, localStorageService){
		var _this = this;
    _this.message = "Login to access.";
    // _this.token = localStorageService.get('auth-token');

    var auth = new Auth($window, jwtHelper);
    _this.isAuth = auth.isAuthenticated();

    _this.login = function(){ console.log('sending login request.');
      var loginData = {
        username: _this.loginFormData.username,
        password: _this.loginFormData.password
      };
      chrome.runtime.sendMessage({ messageName: "login", data: loginData }, function(response){
        console.log('login resonse from bg', response);
        _this.message = response.message;
        _this.isAuth = auth.isAuthenticated();
				$window.location.reload();
      });
    };
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('tbmp').controller('LoginCtrl',[
    '$window',
    'jwtHelper',
		'localStorageService',
		LoginCtrl
	]);
})();
