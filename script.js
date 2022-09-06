const dropList = document.querySelectorAll(".drop-list select");
const getButton = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");

for (let i = 0; i < dropList.length; i++) {
  for (curr_code in country_list) {
    let selected;
    if (i == 0) {
      selected = curr_code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = curr_code == "INR" ? "selected" : "";
    }
    let optionTag = `<option value="${curr_code}" ${selected}>${curr_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

function loadFlag(element) {
  for (code in country_list) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://countryflagsapi.com/png/${country_list[code]}`;
    }
  }
}
getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }
  let url = `https://v6.exchangerate-api.com/v6/a0f579a03dc6d7bcfe419418/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      // console.log(result);
      let totalExchangeRate = (amountVal * exchangeRate).toFixed(3);
      let exchangeRateText = document.querySelector(".exchange-rate ");
      exchangeRateText.innerHTML = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
      console.log(totalExchangeRate);
    })
    .catch(() => {
      exchangeRateText.innerHTML = "Something went Wrong";
    });
}
