export function getUpWorkReviews(url) {
  console.log(url);
  if ((typeof url === 'undefined') || url.length === 0) {
    return false;
  }
  var actorUrl = 'https://api.apify.com/v2/acts/PWaorZyrfNgetFoHp/run-sync?token=9qcDHSZabd8uG3F5DQoB2gyYc';
  //var postData = { "url": "https://www.upwork.com/freelancers/~01572ad80a5f95b2b3" };
  var postData = { "url": url };
  return syncActor(actorUrl, postData);
}

function syncActor(url, postData) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'content-type': 'application/json'
    },
  }).then(function(response) {
    const data = response.json();
    if (data.error) throw new Error(data.error.message || data.error)
    return data
  })
}

export function getTripAdvisorReviews() {
  var url = ("#mce-URL").val();
  console.log(url);
  if ((typeof url === 'undefined') || url.length === 0) {
    return false;
  }
  //var crawlerUrl = 'https://api.apify.com/v1/ZzSb2nF9DzKbWKHkK/crawlers/shWyEM5aAptXrCGLC/execute?token=FKjYAr2TDHGvgA6f4R6LrtZ5r';
  var crawlerUrl = 'https://api.apify.com/v1/ZzSb2nF9DzKbWKHkK/crawlers/C8kADynYBKCusd8FB/execute?token=5cSywfMdEpGC9LCWYW9RBzLiS';
  var postData = {
    'customData': JSON.stringify({
      'mode': 'recheck',
      'url_list': [ { 'URL': url, 'cutoff_date': '1970-01-01' } ]
    })
  };
  startCrawler(crawlerUrl, postData);
}

export function getYelpReviews(url) {
  console.log(url);
  if ((typeof url === 'undefined') || url.length === 0) {
    return false;
  }
  var crawlerUrl = 'https://api.apify.com/v1/ZzSb2nF9DzKbWKHkK/crawlers/x9RP3rua6zcc7oPHK/execute?token=Hgr6dCi2Lx5q4Gu4mGQ9FCM5Q';
  var postData = {
    'customData': JSON.stringify({
      'mode': 'recheck',
      'url_list': [ { 'URL': url, 'cutoff_date': '1970-01-01' } ]
    })
  };
  return startCrawler(crawlerUrl, postData);
}

function startCrawler(crawlerUrl, postData) {  
  return fetch(crawlerUrl, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return keepPolling(data);
    });
}

function keepPolling(apifyExecution) {
  return new Promise((resolve, reject) => {
    console.log(apifyExecution);
    if (apifyExecution.status !== 'SUCCEEDED' && apifyExecution.finishedAt === null) {
      console.log('setting timeout');
      setTimeout(function(){
        console.log('calling ' + apifyExecution.detailsUrl);
        fetch(apifyExecution.detailsUrl, { method: 'GET' })
          .then(function(response) { return response.json(); })
          .then(function(data) {
            const apifyExecution = data;
            keepPolling(apifyExecution)
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);
      }, 10000);
    } else {
      console.log('completed...');
      fetch(apifyExecution.resultsUrl, { method: 'GET' })
        .then(function(response) { return response.json(); })
        .then(function(data) {
          console.log('RESULTS')
          console.log(data)
          try {
            const reviews = getCrawlerResults(data)
            console.log(reviews)
            resolve(reviews)
          } catch (error) {
            reject(error)
          }
        })
        .catch(reject);
    }
  })
}

function getCrawlerResults(apifyResults){
  var reviews = [];
  for(var i in apifyResults) {
    if (apifyResults[i].errorInfo && apifyResults[i].loadErrorCode) {
      throw new Error(apifyResults[i].errorInfo)
    }
    for(var r in apifyResults[i].pageFunctionResult) {
      reviews.push((apifyResults[0].pageFunctionResult[r]));
    }
  }
  return reviews;
}