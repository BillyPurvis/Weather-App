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
            success: function (parsed_json) {
                var location = parsed_json.location.city,
                    temp_c   = parsed_json.current_observation.temp_c,
                    temp_f   = parsed_json.current_observation.temp_f,
                    wind_mph = parsed_json.current_observation.wind_mph,
                    weather  = parsed_json.current_observation.weather,
                    img      = parsed_json.current_observation.icon_url;
                console.log(parsed_json);
                // Bind data to HTML Elms
                document.getElementById("location").innerHTML = location;
                document.getElementById("weather").innerHTML  = weather;
                document.getElementById("temp").innerHTML     = temp_c + " c" + " / " + temp_f + " f";
                document.getElementById("wind").innerHTML     = wind_mph + " mph";
                $("img").attr('src', img);

            }
        });
    }

    function populateCoords(lat, lng) {
        // If you want to show co-ords
    }

    function error() {
        document.getElementById("err").innerHTML = "Geo Location Failed, either your browser doesn't support Geo Location or it's blocked.";
    }


});