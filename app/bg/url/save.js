// TODO: check url in cache,
var saveUrl = function(request, lodash, tagsCache, urlsCache, topicsCache, $http){
  var BASEURL = "http://localhost:3000";
  console.log(request.data);
  // PAYLOAD ----------------------------------------
  var payload = {
    url: request.data.url,
    title: request.data.title,
    favIconUrl: request.data.favIconUrl,
    description: request.data.description
  };

  // PREPARE DATA -----------------------------------
    // TOPICS
      var selectedTopic = (request.data.topic && request.data.topic.originalObject) ? request.data.topic.originalObject : undefined ;
      if(lodash.isObject(selectedTopic)){
        payload.topic = {new: false, topicName: selectedTopic.name , topicId: selectedTopic._id};
      } else if (lodash.isString(selectedTopic)){
        payload.topic = {new: true, topicName: selectedTopic};
      }

    // TAGS
      var mappedTags = lodash.map(request.data.tags, "text");
      var oldTags = [];
      var newTags = [];
      mappedTags.forEach(function(i){
        console.log(i,lodash.includes(tagsCache.get('tagsKey'), i));
        if(lodash.includes(tagsCache.get('tagsKey'), i)){
          oldTags.push(i);
        } else {
          newTags.push(i);
        }
      });
      payload.tags = { old: oldTags, new: newTags};

      console.log('Payload', payload);
  // SEND DATA ---------------------------------------
  $http.post(BASEURL + '/api/urls', payload).then(function(response){
    console.log('URL Saved: \n',response);
    // UPDATE URLS CACHE
    var oldNewUrlsContcat = urlsCache.get('urlsKey').concat(response.data.data.url);
    console.log(oldNewUrlsContcat);
    urlsCache.put('urlsKey', oldNewUrlsContcat);

    // UPDATE TAGS CACHE
    if(response.data.new.tags){
      var oldTags = tagsCache.get('tagsKey');
      var oldNewTagsConcat = oldTags.concat(response.data.new.tags);
      console.log(oldTags, oldNewTagsConcat);
      tagsCache.put('tagsKey', oldNewTagsConcat);
    }

    // UPDATE TOPIC CACHE
    var oldNewTopicsConcat = topicsCache.get('topicsKey').concat(response.data.new.topic);
    console.log(oldNewTopicsConcat);
    if (response.data.new.topic){
      topicsCache.put('topicsKey', oldNewTopicsConcat);
    }
    // CREATE NOTIFICATION ----------------------------
    var options = {
      type: "basic",
      iconUrl: "../../icons/chrome-icon128.png",
      title: "Url saved successfully!",
      message: response.data.message,
    };
    chrome.notifications.create(options);
  },function(error){
    console.error(error);
    var options = {
      type: "basic",
      iconUrl: "../../icons/chrome-icon128.png",
      title: "ERROR !!! ERROR !!! ERROR !!!",
      message: (lodash.isObject(error.data)) ? error.data.message : error.statusText,
    };
    chrome.notifications.create(options);
  });
};
