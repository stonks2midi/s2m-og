// Get the data from the user's input

const API_KEY = "8KOBOUBTEF7RHR21"

$('stonkForm').submit(function() {
  fromCurrencyCode = $('fromCurrencyCode').val();
  toCurrencyCode = $('toCurrencyCode').val();
});

// Get the data from the stonk API
let request = new XMLHttpRequest();

request.open('GET', 'https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=GBP&to_symbol=EUR&apikey=8KOBOUBTEF7RHR21', true);

request.onload = function() {
  //Begin accessing JSON data here
  let data = JSON.parse(this.response);
  console.log(data);

  let exchangeRate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
  console.log(exchangeRate);
}

request.send();

$('exchangeRate').innerHTML = exchangeRate;