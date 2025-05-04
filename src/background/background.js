chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendToContent") {
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;
      chrome.tabs.sendMessage(tabs[0].id, { action: "processMessage", data: message.data }, (response) => {
        sendResponse(response);
      });
    });
    return true; // Required for asynchronous response
  }
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setToken') {
    //console.log('Token received and stored in background.');
    
    // Store token in local storage
    chrome.storage.local.set({ 'autotoken69': request.token69 }, () => {
      //console.log('Token saved in storage.');
    });

    // Send token to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;
      chrome.tabs.sendMessage(tabs[0].id, { 
        action: "setautotoken69", 
        token69: request.token69 
      });
    });

    return true; // Ensures sendResponse works asynchronously
  }

  if (request.action === 'removeToken') {
    chrome.storage.local.remove(['autotoken69'], () => {
      //console.log('authToken removed from local storage');
      sendResponse({ success: true });
    });

    return true; // Ensures sendResponse works asynchronously
  }
});



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "givetoken") {
    chrome.storage.local.get('autotoken69', (result) => {
      if(!result.autotoken69){
        sendResponse({ success: false, error: "No token found." });
        return;
      }
      
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
          sendResponse({ success: false, error: "No active tab found." });
          return;
        }

        // Send message to content script
        chrome.tabs.sendMessage(tabs[0].id, { action: "setautotoken69", token69: result.autotoken69 }, (response) => {
          sendResponse(response || { success: true });
        });

      });

    });

    return true; // Keep the messaging channel open for async response
  }
});



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getTabInfo") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;
      const tab = tabs[0];
      sendResponse({
        url: tab.url,
        title: tab.title,
        favicon: tab.favIconUrl
      });
    });
    return true; // Required for async response
  }
});






chrome.runtime.onStartup.addListener(() => {
  //console.log("Browser just started!");

  chrome.storage.local.get(null, (items) => {
    if (chrome.runtime.lastError) {
      //console.error("Error retrieving storage:", chrome.runtime.lastError);
      return;
    }

    //console.log("Stored data before cleanup:", items);

    // Filter out `autotoken69`, deleting everything else
    const keysToDelete = Object.keys(items).filter((key) => key !== "autotoken69");

    if (keysToDelete.length > 0) {
      chrome.storage.local.remove(keysToDelete, () => {
        if (chrome.runtime.lastError) {
          //console.error("Error deleting storage items:", chrome.runtime.lastError);
        } else {
          //console.log("Deleted all except 'autotoken69'.");
          chrome.storage.local.get(["autotoken69"], (tokenResult) => {
                const token = tokenResult.autotoken69;
                if (!token) {
                  //console.log("No token found.");
                  return;
                }
          
                //console.log("Token retrieved:", token);
          
                // Send request to backend
                fetch("https://autonotebackend.shadowbites10.workers.dev/getallurl", {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(4), // ✅ Fix: Removed extra stringify
                })
                  .then((response) => response.json())
                  .then((data) => {
                    //console.log("Received response from backend:", data); // ✅ Debugging
                    if (data.success) {
                      const keystoadd = data.res.file;
                      
                      keystoadd.forEach(item => {
                        if(item.url!=null){
                          chrome.storage.local.set({ [item.url.url]: item.url.file_id }, () => {
                            if (chrome.runtime.lastError) {
                              //console.error(`Error saving ${item.key}:`, chrome.runtime.lastError);
                            } else {
                              //console.log(`Saved: ${item.key} -> ${item.value}`);
                            }
                          });
                        }
                      });
                    } else {
                      //console.error("Backend returned failure:", data);
                    }
                  })
                  .catch((error) => {
                    //console.error("Error updating default state:", error);
                  });
              });
        }
      });
    } else {
      //console.log("Nothing to delete. Only 'autotoken69' exists.");
    }
  });
});
