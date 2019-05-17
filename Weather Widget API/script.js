
/* Build URL skeleton for API call */
var url = 'http://api.openweathermap.org/data/2.5/weather?';
var apiKey = '&appid=ebc379aedcb57485554998251ca00392';
var units = '&units=imperial';


document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
  // Call weather Function for Zip Code lookup
  document.getElementById('zipSubmit').addEventListener('click', function(event) {
    weather(url, 'zip');

  });

  // Call weather function for City, State lookup
  document.getElementById('citySubmit').addEventListener('click', function(event) {
    weather(url, 'city');

  });

  document.getElementById('httpbin').addEventListener('click', function(event) {
    sendContent();
  });
}


function weather(url, val) {
  var zip = document.getElementById('zipCode').value;
  var city = document.getElementById('cityName').value;
  var state = document.getElementById('stateName').value;


  if (val === 'zip') {
    url = url + 'zip=' + zip + ',us' + units + apiKey;
  }

  if (val === 'city') {
    url = url + 'q=' + city + ',' + state + ',us' + units + apiKey;
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

    xhr.onload = function() {
      if(xhr.status === 200) {
        var responseObject = JSON.parse(xhr.responseText);

        console.log(responseObject);

  
        var row = document.getElementById('weatherData');
        var newRow = document.createElement('tr');
        var element1 = document.createElement('td');
        var element2 = document.createElement('td');
        var element3 = document.createElement('td');

        var locText = document.createTextNode(responseObject.name); // Location name
        var tempText = document.createTextNode(responseObject.main.temp); // Location temperature
        var humidityText = document.createTextNode(responseObject.main.humidity); // Location humidity

        // Append new row information to existing table
        row.appendChild(newRow);
        newRow.appendChild(element1);
        element1.appendChild(locText);

        newRow.appendChild(element2);
        element2.appendChild(tempText);

        newRow.appendChild(element3);
        element3.appendChild(humidityText);

      }

    };

    //xhr.open('GET', url, true);
    xhr.send(null);
    event.preventDefault();
}


function sendContent(){
  // new request to Open Weather API
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://httpbin.org/post', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

    // Asynchronous Request
    xhr.onload = function() {
      if(xhr.status === 200) {
        var responseObject = JSON.parse(xhr.responseText);
        console.log(responseObject);

        var response = document.getElementById('returnVal');
        var responseText = document.createTextNode(responseObject.data);
        response.appendChild(responseText);
      }
    };

    // Send data submitted by user
    xhr.send(JSON.stringify(document.getElementById('data').value));
    event.preventDefault();


}