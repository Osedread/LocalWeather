var $wContainer = $('#weatherContainer').hide();
var lat;
var lon;
var cityName;
var countryName;
var tempCelsius;
var tempFarenheit;
var cityString;

$(document).ready( function () {

	$.ajax({
		url: "http://ip-api.com/json", 
		success: function(geoData) {
    		// We get the latitude, longitude and city from the user to use it in the Weather API. Else, we throw an error
    		if (geoData) {
    			lat = parseInt(geoData.lat);
    			lon = parseInt(geoData.lon);
    			cityName = geoData.city; 
    			countryName = geoData.country;	
    		} else {
    			alert("There's been an error retrieving your location.");
    		}
	    	
	    	// We display the city while the ajax call loads.
	    	cityString = '<h5>' + cityName + ', ' + countryName + '.</h5>';
	    	$wContainer.empty();
	    	$wContainer.append(cityString).slideDown();
	    	
	    	// We create the url that retrieves the weather from user latitude and longitude.
			var weatherUrl = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=4124b0c1297eb31fac950246e7dc1023';
			$.get(weatherUrl, function (weatherData) {
				// console.log(weatherData);
				var tempKelvin = weatherData.main.temp;
				tempFarenheit = ((tempKelvin * (9/5))- 459.67).toFixed(2);
				tempCelsius = (tempKelvin - 273.15).toFixed(2);
				var iconCode = weatherData.weather[0].icon;
				var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
				var tempDescription = weatherData.weather[0].description;
				$wContainer.append('<span class="temp">' + tempCelsius + ' ºC</span>' +
					'<label class="switch">' + '<input type="checkbox">' +
					'<div class="slider round"></div>' + '</label>');
				$('#weatherContainer .temp').css({"font-size": "1.6em"});
				$wContainer.append('<p><img src="' + iconUrl + '"/><span>' + tempDescription + '</span></p>');
			}); // end of GET method for weather API
		}, // End of GET method for geolocation API
		error: function() {
			alert('Geolocation request not loading. Try to refresh the page.');
		}
			
	});
		});

// Toggle button to change from Celsius to Farenheit and viceversa
	$wContainer.on('change', 'input', function() {
    if (this.checked) {
    	$('.temp').html('<span class="temp">' + tempFarenheit + ' ºF</span>');
    } else {
    	$('.temp').html('<span class="temp">' + tempCelsius + ' ºC</span>');
    }
	});
