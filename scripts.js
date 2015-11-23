/*jslint browser: true*/
/*global $, jQuery*/

$(function () {
    'use strict';
    var Geo = {},
        coords = document.getElementById("coords");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }

    // Get Lat/Long
    function success(position) {
        Geo.lat = position.coords.latitude;
        Geo.lng = position.coords.longitude;
        // Pass populateCoords object func
        populateCoords(Geo.lat, Geo.lng);

        $.ajax({
            url: "http://api.wunderground.com/api/0e5af2c42173a4e4/geolookup/conditions/q/" + Geo.lat + "," + Geo.lng + ".json",
        
            dataType: "jsonp", // JSON can't exchange data between servers, so we use JSONP.
            success: function (Data) {
                var location = Data.location.city,
                    temp_c   = Data.current_observation.temp_c,
                    temp_f   = Data.current_observation.temp_f,
                    wind_mph = Data.current_observation.wind_mph,
                    weather  = Data.current_observation.weather,
                    img      = Data.current_observation.icon_url;
                console.log(Data);
                // Bind data to HTML Elms
                $("#location").html(location);
                $("#weather").html(weather);
                $("#temp").html(temp_c + " c" + " / " + temp_f + " f");
                $("#wind").html(wind_mph + " mph");
                $("img").attr('src', img);
            },
            error: function () {
                $("#err").html("Error");
            };
        });
    }

    function populateCoords(lat, lng) {
        // If you want to show co-ords
    }
    
    // Err function previously here, but I'm refurned an error the sucess doesn't respond. 

});