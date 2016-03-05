(function() {
  'use strict';
	var UrlCtrl = function(localStorageService, $aside, UrlService){
		var _this = this;
    _this.urls = [];

    // UrlService.retriveUrls().then(function(data){
    //   console.log(data);
    // }, function(error){
    //   console.error(error);
    // });

    chrome.runtime.sendMessage({messageName: "retriveUrls"}, function(response){
      // _this.message = response.data.message;
      console.log('reponse form bg for url: ', response);
      // _this.urls = response.data.data;
    });

	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('tbmp').controller('UrlCtrl',[
		'localStorageService',
    '$aside',
    'UrlService',
		UrlCtrl
	]);
})();
