// VARIABLES

// Constants

const API_KEY = "8KOBOUBTEF7RHR21";

// FUNCTIONS

function transformAPIData(data, rootKey) {
  let dataValuesArray = Object
    .entries(data[rootKey])
    .sort(function(a, b) {
      return new Date(a[0]) - new Date(b[0]);
    })
    .map(function(item) {
      return parseFloat(item[1]["4. close"]);
    });

    return dataValuesArray;
}

function getExchangeRate(from, to) {
  let request = new XMLHttpRequest();

  let requestURL = `https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${from}&to_symbol=${to}&apikey=${API_KEY}`;
  
  request.open('GET', requestURL, true);
  
  request.onload = function() {
    //Begin accessing JSON data here
    let data = JSON.parse(this.response);

    let dataValuesArray = transformAPIData(data, "Time Series FX (Monthly)");

    console.log(dataValuesArray);

    return dataValuesArray;
  }

  request.send();
  
}

function getStonks(symbol) {
  let request = new XMLHttpRequest();

  let requestURL = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${API_KEY}`;
  
  request.open('GET', requestURL, true);

  request.onload = function() {
    //Begin accessing JSON data here
    let data = JSON.parse(this.response);

    let dataValuesArray = transformAPIData(data, "Monthly Time Series");
    
    console.log(dataValuesArray);

    return dataValuesArray;
  }

  request.send();
  
}

// Get the data from the user's input

document.getElementById("stonkForm").addEventListener('submit', function(e) {
  e.preventDefault();
  let fromCode = document.getElementById("fromCurrencyCode").value;
  let toCode = document.getElementById("toCurrencyCode").value;

  getExchangeRate(fromCode, toCode);
});

// Get all the currencies from the file
let currencyRequest = new XMLHttpRequest();

currencyRequest.open('GET', 'https://www.alphavantage.co/physical_currency_list/', true);

currencyRequest.onload = function() {
  //Begin accessing JSON data here
  let data = this.response;

  let dataArray = data.split('\n');
  dataArray.shift();
  dataArray.pop();

  dataArray.forEach(function(item) {
    let option = document.createElement("option");

    option.value = item.split(',')[0];
    option.innerHTML = item.split(',')[1];

    document.getElementById("fromCurrencyCode").appendChild(option);
    document.getElementById("toCurrencyCode").appendChild(option.cloneNode(true));
  });
}

currencyRequest.send();

getStonks("MSFT");