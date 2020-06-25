const input = document.getElementById("input");
const button = document.getElementById("button");

input.addEventListener('keyup', function(event) {
  if(event.keyCode === 13) {
    printAPIData();
  }
})
button.addEventListener('click', printAPIData);



function printAPIData() {
  const apiKey = "119b6b49d1cba0373cac83388df19af2";

  fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid='+apiKey)
    .then(response => response.json())
    .then(data => {
      //reading Data from API
      const nameValue = data['name'];
      const descriptionValue = data['weather'][0]['description'];
      const humidityValue = data['main']['humidity'];
      const countryValue = data['sys']['country'];
      const windspeedValue = data['wind']['speed'];
      let temperatureValue = Math.round(data['main']['temp'] - 273,16); //Conversion from Kelvin to Celsius
      let sunriseValue = new Date(data['sys']['sunrise']*1000); //Conversion from unix time to regular time
      let sunsetValue = new Date(data['sys']['sunset']*1000); //Conversion from unix time to regular time

      printData(nameValue, countryValue, descriptionValue, humidityValue, temperatureValue, windspeedValue, sunriseValue.getHours(), calculateSunMinute(sunriseValue), sunsetValue.getHours(), calculateSunMinute(sunsetValue));

      input.value = "";
    })
    .catch(err => alert("Invalid city name"));
}

function calculateSunMinute(sunValue) {
  let result = sunValue.getMinutes();

  if(result < 10){
    result = "0"+result;
  }
  return result;
}

function printData(nameValue, countryValue, descriptionValue, humidityValue, temperatureValue, windspeedValue, sunriseHour, sunriseMinute, sunsetHour, sunsetMinute) {
  const name = document.getElementById("name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const country = document.getElementById("country");
  const humidity = document.getElementById("humidity");
  const windspeed = document.getElementById("windspeed");
  const sunrise = document.getElementById("sunrise");
  const sunset = document.getElementById("sunset");

  name.innerHTML = "Name: "+nameValue;
  country.innerHTML = "Country: "+countryValue;
  description.innerHTML = "Description: "+descriptionValue;
  humidity.innerHTML = "Humidity: "+humidityValue+" %";
  temperature.innerHTML = "Temperature: ~"+temperatureValue+" °C";
  windspeed.innerHTML = "Windspeed: "+windspeedValue+" km/h";
  sunrise.innerHTML = "Sunrise: "+sunriseHour+":"+sunriseMinute+" Uhr";
  sunset.innerHTML = "Sunset: "+sunsetHour+":"+sunsetMinute+" Uhr";
}
