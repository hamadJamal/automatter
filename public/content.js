function tellPopUP(Message) {
  chrome.runtime.sendMessage(
    Message,
    function (response) {
        console.log(response);
    }
);
}

var listener = function handleClick(event){
  
  element = event.target

  let ClickedElement = ""

  ClickedElement = ClickedElement+ "Type" + " - " + element.tagName + "\n"
  for (var att, i = 0, atts = element.attributes, n = atts.length; i < n; i++){
      att = atts[i];
      ClickedElement = ClickedElement + att.nodeName + " - " + att.nodeValue + "\n"

  }
  console.log(ClickedElement) 
  
  tellPopUP({elementDetected:ClickedElement})


}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("New message from somewhere",request)
  sendResponse("OK I am Enabling Clicks")
  if(request.Recording){

  if (request.Recording=="Start") {
    var body = document.body

    body.addEventListener('click', listener, true);
  
  
  }
  else if (request.Recording=="Pause"){
    var body = document.body
    body.removeEventListener('click',listener,true)


    console.log("Paused")

  }
  else if (request.Recording=="Resume"){
    var body = document.body
    body.addEventListener('click', listener, true);
    console.log("Resume")


  }
  else if (request.Recording=="Stop"){

    var body = document.body
    body.removeEventListener('click',listener,true)


  }
  
  



























  }

  })
