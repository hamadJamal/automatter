var ApptabID;
var SiteTabId;
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.windows.create({url: chrome.runtime.getURL("index.html"), type: "popup", height: 600, width:400 }, function (window){

        ApptabID = window.tabs[0].id
    });

});      


function ping(tabID,SiteID) {
    console.log(SiteID)

    chrome.tabs.query({active: true}, function(tabs){ 
        console.log("Now sending message to the React App")

        chrome.tabs.sendMessage(tabID,{"AddressOfScript": SiteID}, response => {
            console.log(response)
        })
        });
}
          
// chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
//     console.log(msg)

// });

