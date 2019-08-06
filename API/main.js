// VARIABLES

// Constants

const API_KEY = "8KOBOUBTEF7RHR21";

// FUNCTIONS

function getExchangeRate(from, to) {
  let request = new XMLHttpRequest();

  let requestURL = `https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${from}&to_symbol=${to}&apikey=8KOBOUBTEF7RHR21`;
  console.log(requestURL);
  
  request.open('GET', requestURL, true);

  console.log('stonk function called');
  
  request.onload = function() {
    //Begin accessing JSON data here
    let data = JSON.parse(this.response);
    console.log(data);

    let dataValuesArray = Object.values(data["Time Series FX (Monthly)"]).map(function(item) {
      return parseFloat(item["4. close"]);
    });

    console.log(dataValuesArray);
  }

  request.send();
}

// Get the data from the user's input

document.getElementById("stonkForm").addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('from and to currency submitted');
  let fromCode = document.getElementById("fromCurrencyCode").value;
  console.log(fromCode);
  let toCode = document.getElementById("toCurrencyCode").value;
  console.log(toCode);

  getExchangeRate(fromCode, toCode);
});

// Get all the currencies from the file
let currencyRequest = new XMLHttpRequest();

currencyRequest.open('GET', 'https://www.alphavantage.co/physical_currency_list/', true);

currencyRequest.onload = function() {
  //Begin accessing JSON data here
  console.log(this.response);
  let data = this.response;
  console.log(data);

  let dataArray = data.split('\n');
  dataArray.shift();
  dataArray.pop();

  console.log(dataArray);

  dataArray.forEach(function(item) {
    let option = document.createElement("option");

    option.value = item.split(',')[0];
    option.innerHTML = item.split(',')[1];

    document.getElementById("fromCurrencyCode").appendChild(option);
    document.getElementById("toCurrencyCode").appendChild(option.cloneNode(true));
  });
}

currencyRequest.send();

// Get the data from the stonk API
let request = new XMLHttpRequest();

request.open('GET', 'https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=GBP&to_symbol=EUR&apikey=8KOBOUBTEF7RHR21', true);

request.onload = function() {
  //Begin accessing JSON data here
  let data = JSON.parse(this.response);
  console.log(data);

  // let exchangeRate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
  // console.log(exchangeRate);
}

request.send();

$('exchangeRate').innerHTML = exchangeRate;

/**
 * Gets currency data from the alpha advantage API
 * 
 * @param {*} from 
 * @param {*} to 
 * 
 * @returns JSON
 */
function getCurrencyData(from = "GBP", to = "EUR") {
  // Build the url for the api using the symbols passed in the function prototype
  var url = ''; 

  // 
}