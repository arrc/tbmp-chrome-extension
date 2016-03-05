(function() {
  'use strict';
	var LoginCtrl = function(localStorageService){
		var _this = this;
    _this.message = "Login to access.";
    _this.token = localStorageService.get('auth-token');

    console.log('Login token', _this.token);

    _this.login = function(){ console.log('sending login request.');
      var loginData = {
        username: _this.loginFormData.username,
        password: _this.loginFormData.password
      };
      chrome.runtime.sendMessage({ messageName: "login", data: loginData }, function(response){
        console.log('login resonse from bg', response);
        _this.message = response.message;
      });
    };
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('tbmp').controller('LoginCtrl',[
		'localStorageService',
		LoginCtrl
	]);
})();
