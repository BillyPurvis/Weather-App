/*jslint browser: true*/
/*global $, jQuery, alert*/

$(function () {
    'use strict';
    // Define a options parameter where we can 
    // limit timeOut etc
    var configOpt = {
        timeout: 2000
    };
    
    // Get position and set getWeather() as a parameter if successful
    
    
    function getWeather() {
   
        $.ajax({
            url : "http://api.wunderground.com/api/0e5af2c42173a4e4/geolookup/conditions/q/GB/London.json",
            dataType : "jsonp",
            success : function (Data) {
                var location = Data.location.city,
                    temp_c   = Data.current_observation.temp_c,
                    wind_mph = Data.current_observation.wind_mph;
                alert("Current temperature in " + location + " is: " + temp_c + " and wind is " + wind_mph + " mph");
            },
            error: function (errorThrown) {
                alert("You fucked up boy");
            }
        });
   
    }
    getWeather();
    
    
});