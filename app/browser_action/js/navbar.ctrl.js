(function() {
  'use strict';
	var NavbarCtrl = function($window, jwtHelper, localStorageService, $aside){
		var _this = this;
    var auth = new Auth($window, jwtHelper);
    _this.isAuth = auth.isAuthenticated();

    _this.logout = function(){
      auth.clearToken();
      _this.isAuth = auth.isAuthenticated();
			$window.location.reload();
    };

	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('tbmp').controller('NavbarCtrl',[
    '$window',
    'jwtHelper',
		'localStorageService',
    '$aside',
		NavbarCtrl
	]);
})();
