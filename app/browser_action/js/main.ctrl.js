(function() {
  'use strict';
	var MainCtrl = function(localStorageService, $aside){
		var _this = this;
    _this.topics = localStorageService.get('topicsCache.data.topicsKey').value; console.log('Cached topics \n',_this.topics);
    _this.tags = localStorageService.get('tagsCache.data.tagsKey').value; console.log('Cached tags \n',_this.tags);

    _this.message = "this is the test message.";
    _this.names = [{name: 'naveen'},{ name: 'neha'}, {name: 'sam'}];

    _this.urlDetails = function(){
      _this.topics = undefined;
      _this.tags = undefined;
      chrome.tabs.query({ lastFocusedWindow: true, active: true}, function(tabs){
        var urlData = {
          url: tabs[0].url,
          title: tabs[0].title,
          favIconUrl: tabs[0].favIconUrl,
          tags: _this.urlDetailsFormData.selectedTags,
          topic: _this.urlDetailsFormData.selectedTopic,
          description: _this.urlDetailsFormData.description
        };
        chrome.runtime.sendMessage({messageName: "prepareData", data: urlData}, function(response){
          _this.message = response.data.message;
        });
      });
    };

    _this.offcanvas = function(){
      var asideInstance = $aside.open({
        templateUrl: 'views/offcanvas.html',
        controller: 'MainCtrl',
        placement: 'right',
        size: 'lg'
      });
    };

	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('tbmp').controller('MainCtrl',[
		'localStorageService',
    '$aside',
		MainCtrl
	]);
})();
