
const sendDira = (dira) => {
  chrome.runtime.sendMessage({message: "OnDira", dira}, () => {});
};


const initScript = () => {
  if(window.location.href.includes("yad2")){
    yad2()
  }
};


const getYad2Id = () => {
  if(window.location.href.includes("open-item-id")) {
    return /open-item-id=(\w+)&/.exec(window.location.href)[1]
  }
  if(window.location.href.includes("item/")) {
    return /item\/(\w+)/.exec(window.location.href)[1]
  }
};

const yad2GetPopupParams = () => {
  let component = document.querySelector(".top_components");
  let bottom_component = document.querySelector(".light_box_content");
  return {
    id: getYad2Id(),
    street: component.querySelector(".main_title").innerHTML,
    city: component.querySelector(".desceiption").innerText,
    rooms: component.querySelector(".table .cell .value").innerText,
    floor: component.querySelector(".table .cell:nth-child(2) .value").innerText,
    size: component.querySelector(".table .cell:nth-child(3) .value").innerText,
    price: component.querySelector(".price").innerText,
    condition: bottom_component.querySelector(".more_data div:nth-child(0) span").innerText,
    source: "yad2"
  };
};

const madlanGetPopupParams = () => {
  let component = document.querySelector("div[data-auto='Overview/header-block']");
  let mainSection = component.querySelector("div div:nth-child(2) div:nth-child(1)")
  let detailsSection = mainSection.querySelector("div:nth-child(2)")
  let bottom_component = document.querySelector(".light_box_content");
  return {
    id: getYad2Id(),
    street: component.querySelector("div[data-auto='primary_address_text']").innerText,
    city: component.querySelector("div[data-auto='secondary_address_text']").innerText,
    price: component.querySelector("section div:nth-child(2) h2").innerText,
    rooms: component.querySelector(".table .cell .value").innerText,
    floor: component.querySelector(".table .cell:nth-child(2) .value").innerText,
    size: component.querySelector(".table .cell:nth-child(3) .value").innerText,
    condition: bottom_component.querySelector(".more_data div:nth-child(0) span").innerText,
    source: "yad2"
  };
}




const yad2 = () => {
  if(!getYad2Id()) {
    return;
  }
  sendDira(yad2GetPopupParams())
};

// alert("TEST");
setInterval(initScript, 1000);