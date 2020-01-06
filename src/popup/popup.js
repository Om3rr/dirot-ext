import Vue from 'vue';
import App from './App';
import store from '../store';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,

  render: h => h(App),
});


chrome.runtime.onMessage.addListener(({message, dira}) => {
  if(message === "OnDira") {
    store.dispatch("newDira", dira);
  }
  if(message === "") {

  }
});


function exists() {
  chrome.browserAction.setIcon({path: {"64": "/icons/sign-lenguage-g.png"}})
}


function missing() {
  chrome.browserAction.setIcon({path: {"64": "/icons/whats-up.png"}})
}
