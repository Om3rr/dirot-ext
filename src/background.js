import store from './store';
import axios from 'axios';
chrome.runtime.onMessage.addListener(({message, dira}) => {
  if(message === "OnDira") {
    //store.dispatch("newDira", dira);
    if(dirot[dira.id]) {
      exists();
    } else {
      sendDira(dira);
      missing();
    }
  }
  if(message === "addDira") {
    sendDira(dira);
  }
});

function dirotDb() {
  chrome.storage.sync.get(["dirots"], function(res) {
    dirot = res;
  });
}


function sendDira(dira) {
  axios.post("http://localhost:5000/dira", {dira});
  dirot[dira.id] = dira;
  chrome.storage.sync.set({"dirot": dirot})
}




function exists() {
  chrome.browserAction.setIcon({path: {"64": "/icons/whats-up.png"}})
}


function missing() {
  chrome.browserAction.setIcon({path: {"64": "/icons/sign-lenguage-g.png"}})
}

var dirot;
dirotDb();



