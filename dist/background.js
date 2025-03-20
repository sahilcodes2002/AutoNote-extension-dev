/******/ (() => { // webpackBootstrap
/*!**************************************!*\
  !*** ./src/background/background.js ***!
  \**************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "sendToContent") {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      if (tabs.length === 0) return;
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "processMessage",
        data: message.data
      }, function (response) {
        sendResponse(response);
      });
    });
    return true; // Required for asynchronous response
  }
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'setToken') {
    console.log('Token received and stored in background.');

    // Store token in local storage
    chrome.storage.local.set({
      'autotoken69': request.token69
    }, function () {
      console.log('Token saved in storage.');
    });

    // Send token to content script
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      if (tabs.length === 0) return;
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "setautotoken69",
        token69: request.token69
      });
    });
    return true; // Ensures sendResponse works asynchronously
  }
  if (request.action === 'removeToken') {
    chrome.storage.local.remove(['autotoken69'], function () {
      console.log('authToken removed from local storage');
      sendResponse({
        success: true
      });
    });
    return true; // Ensures sendResponse works asynchronously
  }
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "givetoken") {
    chrome.storage.local.get('autotoken69', function (result) {
      if (!result.autotoken69) {
        sendResponse({
          success: false,
          error: "No token found."
        });
        return;
      }
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        if (tabs.length === 0) {
          sendResponse({
            success: false,
            error: "No active tab found."
          });
          return;
        }

        // Send message to content script
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "setautotoken69",
          token69: result.autotoken69
        }, function (response) {
          sendResponse(response || {
            success: true
          });
        });
      });
    });
    return true; // Keep the messaging channel open for async response
  }
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "getTabInfo") {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      if (tabs.length === 0) return;
      var tab = tabs[0];
      sendResponse({
        url: tab.url,
        title: tab.title,
        favicon: tab.favIconUrl
      });
    });
    return true; // Required for async response
  }
});
chrome.runtime.onStartup.addListener(function () {
  console.log("Browser just started!");
  chrome.storage.local.get(null, function (items) {
    if (chrome.runtime.lastError) {
      console.error("Error retrieving storage:", chrome.runtime.lastError);
      return;
    }
    console.log("Stored data before cleanup:", items);

    // Filter out `autotoken69`, deleting everything else
    var keysToDelete = Object.keys(items).filter(function (key) {
      return key !== "autotoken69";
    });
    if (keysToDelete.length > 0) {
      chrome.storage.local.remove(keysToDelete, function () {
        if (chrome.runtime.lastError) {
          console.error("Error deleting storage items:", chrome.runtime.lastError);
        } else {
          console.log("Deleted all except 'autotoken69'.");
          chrome.storage.local.get(["autotoken69"], function (tokenResult) {
            var token = tokenResult.autotoken69;
            if (!token) {
              console.log("No token found.");
              return;
            }
            console.log("Token retrieved:", token);

            // Send request to backend
            fetch("https://autonotebackend.shadowbites10.workers.dev/getallurl", {
              method: "POST",
              headers: {
                Authorization: "Bearer ".concat(token),
                "Content-Type": "application/json"
              },
              body: JSON.stringify(4) // ✅ Fix: Removed extra stringify
            }).then(function (response) {
              return response.json();
            }).then(function (data) {
              console.log("Received response from backend:", data); // ✅ Debugging
              if (data.success) {
                var keystoadd = data.res.file;
                keystoadd.forEach(function (item) {
                  if (item.url != null) {
                    chrome.storage.local.set(_defineProperty({}, item.url.url, item.url.file_id), function () {
                      if (chrome.runtime.lastError) {
                        console.error("Error saving ".concat(item.key, ":"), chrome.runtime.lastError);
                      } else {
                        console.log("Saved: ".concat(item.key, " -> ").concat(item.value));
                      }
                    });
                  }
                });
              } else {
                console.error("Backend returned failure:", data);
              }
            })["catch"](function (error) {
              console.error("Error updating default state:", error);
            });
          });
        }
      });
    } else {
      console.log("Nothing to delete. Only 'autotoken69' exists.");
    }
  });
});
/******/ })()
;
//# sourceMappingURL=background.js.map