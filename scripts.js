/*jslint browser: true*/
/*global $, jQuery, alert, console*/

$(function () {
    'use strict';
    // Define a options parameter where we can 
    // limit timeOut etc
    var configOpt = {
        timeout: 2000
    };
    
    // Get position and set getWeather() as a parameter if successful
    function getLocation() {
        
        var location = $("#location");
        
        if (!navigator.geolocation) { // If true, run success, false, err
            console.log("Err");
            return;
        }
        
        function showLocation(position) {
            var latitude  = position.coords.latitude,
                longitude = position.coords.longitude;
            
            console.log(latitude);
            console.log(longitude);
            
        }
        
        function LocationError() {
            alert("Err");
        }
        navigator.geolocation.getCurrentPosition(showLocation, LocationError);
    }
    getLocation();
    

    
    
    function getWeather() {
   
        $.ajax({
            url : "http://api.wunderground.com/api/0e5af2c42173a4e4/geolookup/conditions/q/GB/London.json",
            dataType : "jsonp",
            success : function (Data) {
                var location = Data.location.city,
                    temp_c   = Data.current_observation.temp_c,
                    wind_mph = Data.current_observation.wind_mph;
                console.log("Current temperature in " + location + " is: " + temp_c + " and wind is " + wind_mph + " mph");
            },
            error: function (errorThrown) {
                console.log("You fucked up boy");
            }
        });
   
    }
    getWeather();
    
    
});