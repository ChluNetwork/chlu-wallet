var apifyExecution;
var apifyResults;

export function getUpWorkReviews() {
  var url = ("#mce-URL").val();
  console.log(url);
  if ((typeof url === 'undefined') || url.length == 0) {
    return false;
  }
  var actorUrl = 'https://api.apify.com/v2/acts/PWaorZyrfNgetFoHp/run-sync?token=9qcDHSZabd8uG3F5DQoB2gyYc';
  //var postData = { "url": "https://www.upwork.com/freelancers/~01572ad80a5f95b2b3" };
  var postData = { "url": url };
  syncActor(actorUrl, postData);
}

function syncActor(url, postData) {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'content-type': 'application/json'
    },
  }).then(function(response) { return response.json(); })
    .then(function(data) {
      apifyExecution = data;
      apifyResults = data;
      storeResults(data);
    });
}

export function getTripAdvisorReviews() {
  var url = ("#mce-URL").val();
  console.log(url);
  if ((typeof url === 'undefined') || url.length == 0) {
    return false;
  }
  //var crawlerUrl = 'https://api.apify.com/v1/ZzSb2nF9DzKbWKHkK/crawlers/shWyEM5aAptXrCGLC/execute?token=FKjYAr2TDHGvgA6f4R6LrtZ5r';
  var crawlerUrl = 'https://api.apify.com/v1/ZzSb2nF9DzKbWKHkK/crawlers/C8kADynYBKCusd8FB/execute?token=5cSywfMdEpGC9LCWYW9RBzLiS';
  var postData = {
    'customData': JSON.stringify({
      'mode': 'recheck',
      'url_list': [{'URL': url, 'cutoff_date': '1970-01-01'}]
    })
  };
  startCrawler(crawlerUrl, postData);
}

export function getYelpReviews(url) {
  console.log(url);
  if ((typeof url === 'undefined') || url.length == 0) {
    return false;
  }
  var crawlerUrl = 'https://api.apify.com/v1/ZzSb2nF9DzKbWKHkK/crawlers/x9RP3rua6zcc7oPHK/execute?token=Hgr6dCi2Lx5q4Gu4mGQ9FCM5Q';
  var postData = {
    'customData': JSON.stringify({
      'mode': 'recheck',
      'url_list': [{'URL': url, 'cutoff_date': '1970-01-01'}]
    })
  };
  return startCrawler(crawlerUrl, postData);
}

export function startCrawler(crawlerUrl, postData) {  
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

export function keepPolling(apifyExecution) {
  return new Promise((resolve, reject) => {
    console.log(apifyExecution);
    if (apifyExecution.status !== 'SUCCEEDED' && apifyExecution.finishedAt === null) {
      console.log('setting timeout');
      setTimeout(function(){
        console.log('calling ' + apifyExecution.detailsUrl);
        fetch(apifyExecution.detailsUrl, {method: 'GET'})
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
      fetch(apifyExecution.resultsUrl, {method: 'GET'})
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

export function getCrawlerResults(apifyResults){
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

export function storeResults(reviews){
  return localStorage.setItem('crawlerResults', JSON.stringify(reviews));
}

/////////////// IPFS

export function storeLocalStorageReputation() {
  var did = JSON.parse(localStorage.getItem('did'));
  var reviews = JSON.parse(localStorage.getItem('crawlerResults'));
  if (did && reviews) {
    return storeReputation(did, reviews);
  } else {
    throw new Error('missing data');
  }
}

export function storeReputation(did, reviews) {
  return new Promise(function (resolve, reject) {
    console.log('storeReputation', did, reviews);
    //var url = 'http://localhost:3001/reputation';
    var url = 'https://did.chlu.io/service/reputation';
    var req = {
      didDocument: did,
      reviews: reviews
    };
    // https://stackoverflow.com/questions/39519246/make-xmlhttprequest-post-using-json#39519299
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function () {
      if(xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          console.log('XMLHTTPREQUEST OK');
          resolve({ did: req.didDocument });
        } else {
          console.log('XMLHTTPREQUEST FAILED', xmlhttp.status);
          reject(xmlhttp.responseText);
        }
      }
    };
    xmlhttp.send(JSON.stringify(req));
  });
}
