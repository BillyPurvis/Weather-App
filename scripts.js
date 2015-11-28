/*jslint browser: true*/
/*global $, jQuery, alert, console, var */

$(function () {
    'use strict';
    // Define a options parameter where we can 
    // limit timeOut etc
    var configOpt = {
        timeout: 2000,
        cache: true
    },
        location = $("#location");
    
    // Get position and invoke location and ajax req if successful location grab
    //function getLocation() {
        
        
    if (!navigator.geolocation) { // If true, run success, false, err
        console.log("Err");
        return;
    }
        
    function showLocation(position, configOpt) {
            
        var latitude  = position.coords.latitude,
            longitude = position.coords.longitude;
            
        $.ajax({
            url: "http://api.wunderground.com/api/0e5af2c42173a4e4/geolookup/conditions/q/" + latitude + "," + longitude + ".json",
            dataType : "jsonp",
            success : function (Data) {
                var location = Data.location.city,
                    temp_c   = Data.current_observation.temp_c,
                    wind_mph = Data.current_observation.wind_mph;
                $("#location").html("Current temperature in " + location + " is: " + temp_c + " and wind is " + wind_mph + " mph");
            },
            error: function (errorThrown) {
                $("#i").html("Weather Err");
            }
        });
    }
        
    function LocationError() {
        alert("Err");
    }
    navigator.geolocation.getCurrentPosition(showLocation, LocationError);
   // }
    //getLocation();
});