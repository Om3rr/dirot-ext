var currentDira = {};
const sendDira = dira => {
  if (currentDira.id === dira.id) {
    return;
  }
  currentDira = dira;
  chrome.runtime.sendMessage({ message: 'OnDira', dira }, () => {});
};

const initScript = () => {
  if (window.location.href.includes('yad2')) {
    yad2();
  }
  if (window.location.href.includes('madlan.co.il')) {
    madlan();
  }
};

const getYad2Id = () => {
  if (window.location.href.includes('open-item-id')) {
    return /open-item-id=(\w+)&/.exec(window.location.href)[1];
  }
  if (window.location.href.includes('item/')) {
    return /item\/(\w+)/.exec(window.location.href)[1];
  }
};

const yad2GetPopupParams = () => {
  let component = document.querySelector('.top_components');
  let bottom_component = document.querySelector('.light_box_content');
  return {
    id: getYad2Id(),
    street: component.querySelector('.main_title').innerHTML,
    city: component.querySelector('.desceiption').innerText,
    rooms: component.querySelector('.table .cell .value').innerText,
    floor: component.querySelector('.table .cell:nth-child(2) .value').innerText,
    size: component.querySelector('.table .cell:nth-child(3) .value').innerText,
    price: component.querySelector('.price').innerText,
    condition: bottom_component.querySelector('.more_data div:nth-child(1) span').innerText,
    source: 'yad2',
  };
};
const madlanGetId = () => {
  const path = window.location.pathname.split('/');
  if (path[path.length - 2] === 'listings') {
    return path[path.length - 1];
  }
};

let getByXpath = xpath => {
  return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
};
let madlanGetPopupParams = () => {
  let component = document.querySelector("div[data-auto='Overview/header-block']");
  let topComponent = document.querySelector("div[data-auto='Overview/header-block'] > div:nth-child(2) > div > section");
  let bottomComponent = document.querySelector("div[data-auto='Overview/header-block'] > div:nth-child(2) > div > div:nth-child(3)");
  return {
    id: madlanGetId(),
    street: component.querySelector("h2[data-auto='primary_address_text']").innerText,
    city: component.querySelector("div[data-auto='secondary_address_text']").innerText,
    rooms: bottomComponent.firstChild.innerText,
    floor: bottomComponent.children[1].innerText,
    size: bottomComponent.children[2].innerText,
    price: topComponent.lastChild.firstChild.innerText,
    condition: getByXpath("//div[text()='מצב הנכס:']").parentElement.lastChild.innerText,
    source: 'madlan',
  };
};

const yad2 = () => {
  if (!getYad2Id()) {
    return;
  }
  sendDira(yad2GetPopupParams());
};

const madlan = () => {
  if (!madlanGetId()) {
    return;
  }
  sendDira(madlanGetPopupParams());
};

// alert("TEST");
setInterval(initScript, 1000);
