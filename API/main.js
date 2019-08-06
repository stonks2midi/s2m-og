// VARIABLES

// Constants

const API_KEY = "8KOBOUBTEF7RHR21";

// FUNCTIONS

async function getExchangeRate(from, to) {
  const requestURL = `https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${from}&to_symbol=${to}&apikey=${API_KEY}`;

  // You can only do 5 calls per minute

  const response = await fetch(requestURL);
  const data = await response.json();

  const dataValuesArray = Object.entries(data["Time Series FX (Monthly)"])
    .sort(function(a, b) {
      return new Date(a[0]) - new Date(b[0]);
    })
    .map(function(item) {
      return parseFloat(item[1]["4. close"]);
    });

  console.log(dataValuesArray);

  return dataValuesArray;
}

async function getStonks(symbol) {
  const requestURL = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${API_KEY}`;

  const response = await fetch(requestURL);
  const data = await response.json();

  const dataValuesArray = Object.entries(data["Monthly Time Series"])
    .sort(function(a, b) {
      return new Date(a[0]) - new Date(b[0]);
    })
    .map(function(item) {
      return {
        sharePrice: parseFloat(item[1]["4. close"]),
        volume: parseInt(item[1]["5. volume"])
      };
    });

  console.log(dataValuesArray);

  return dataValuesArray;
}

// Get the data from the user's input

document.getElementById("stonkForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let fromCode = document.getElementById("fromCurrencyCode").value;
  let toCode = document.getElementById("toCurrencyCode").value;

  getExchangeRate(fromCode, toCode);
});

// Get all the currencies from the file
let currencyRequest = new XMLHttpRequest();

currencyRequest.open(
  "GET",
  "https://www.alphavantage.co/physical_currency_list/",
  true
);

currencyRequest.onload = function() {
  //Begin accessing JSON data here
  let data = this.response;

  let dataArray = data.split("\n");
  dataArray.shift();
  dataArray.pop();

  dataArray.forEach(function(item) {
    let option = document.createElement("option");

    option.value = item.split(",")[0];
    option.innerHTML = item.split(",")[1];

    document.getElementById("fromCurrencyCode").appendChild(option);
    document
      .getElementById("toCurrencyCode")
      .appendChild(option.cloneNode(true));
  });
};

currencyRequest.send();

// call this with async / await
async function getData() {
  return {
    google: await getStonks("GOOG"),
    microsoft: await getStonks("MSFT"),
    apple: await getStonks("AAPL"),
    wetherspoons: await getStonks("JDW.LON"),
    GBPtoUSD: await getExchangeRate("GBP", "USD"),
    GBPtoEUR: await getExchangeRate("GBP", "EUR")
  };
}

async function getAsyncData() {
  const data = await getData();
  console.log(data);
}

getAsyncData();
