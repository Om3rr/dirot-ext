import axios from 'axios';
var currentDira = {};
chrome.runtime.onMessage.addListener(async ({ message, dira }) => {
  if (message === 'OnDira') {
    currentDira = await sendDira(dira);
  }
  if (message === 'badDira') {
    await badDira();
  }
  if (message === 'goodDira') {
    await goodDira();
  }
});

async function sendDira(dira) {
  const {
    data: { dira: diraResponse },
  } = await axios.post('http://localhost:5000/dira', { dira });
  currentDira = dira;
  return diraResponse;
}

async function badDira() {
  debugger;
  await axios.post(`http://localhost:5000/dira/${currentDira.row}/bad`);
}

async function goodDira() {
  debugger;
  await axios.post(`http://localhost:5000/dira/${currentDira.row}/good`);
}
