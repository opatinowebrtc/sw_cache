'use strict';

var DEBUG = true;

if (!self.debug) {
  self.debug = function debug(message) {
    dump("Execution context: " + message + "\n");
  };
}

self.addEventListener('install', evt => {
  if (DEBUG) {
    debug('install event fired!');
  }

  function delaysAsInstalled() {
    if (DEBUG) {
      debug('delaying treating the installing worker as installed!');
    }
    return Promise.resolve();
  }
  evt.waitUntil(delaysAsInstalled());
});

self.addEventListener('activate', evt => {
  if (DEBUG) {
    debug('activate event fired!');
  }
  function delaysAsActivated() {
    if (DEBUG) {
      debug('delaying treating the installing worker as activated!');
    }
    return Promise.resolve();
  }
  evt.waitUntil(delaysAsActivated());
});

self.addEventListener('fetch', evt => {
  var request = evt.request;
  var url = new URL(request.url);
  
  if (DEBUG) {
    debug('fetching ' + url.pathname);
  }

  evt.respondWith(fetch(request));
});

// photo by leg0fenris: https://www.flickr.com/photos/legofenris/
var troopers = 'blob:https://mdn.github.io/6d4a4e7e-0b37-c342-81b6-c031a4b9082c'

var legoBox;
Promise.all([
  fetch(troopers),
  caches.open('legos')
]).then(function(results) {
  var response = results[0];
  legoBox = results[1];
  return legoBox.put(troopers, response);
}).then(function() {
  return legoBox.match(troopers);
}).then(function(response) {
  // invade rebel base
});