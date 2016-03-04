var GetCache = (function() {
  'use strict';

  var GetCache = function(fullName, $http){

    this.all = function(options){
      console.log('Full name again: ', fullName);
      var BASEURL = "http://localhost:3000";
      var topicsCache = options.topicsCache;
      var tagsCache = options.tagsCache;
      var urlsCache = options.urlsCache;
      console.log(topicsCache.get('topicsKey'),tagsCache.get('tagsKey'),urlsCache.get('urlsKey'));
      // topics
      if(!topicsCache.get('topicsKey')){
        $http.get(BASEURL + '/t/topics').then(function(res){
          topicsCache.put('topicsKey', res.data.data);
        }, function(err){
          console.error(err);
        });
      }
      // tags
      if(!tagsCache.get('tagsKey')){
        $http.get(BASEURL + '/t/profile').then(function(res){
          console.log(res);
          tagsCache.put('tagsKey', res.data.data.tags);
        }, function(err){
          console.error(err);
        });
      }
      // urls
      if(!urlsCache.get('urlsKey')){
        $http.get(BASEURL + '/t/urls').then(function(res){
          console.log(res);
          urlsCache.put('urlsKey', res.data.data);
        }, function(err){
          console.error(err);
        });
      }
    };
  };

  return GetCache;

}());
