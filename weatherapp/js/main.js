$(document).ready(function(){

    // declare global variables
    var longitude, latitude, rawTemp;
    
    //check to see if we have location access
    if (navigator.geolocation) {
        //LETS DO THIS
        navigator.geolocation.getCurrentPosition(function (position) {
            // get the values in place them inside the global variables
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            // make a url varible for cleanliness
            var url = "https://fcc-weather-api.glitch.me/api/current?lat="+latitude+"&lon="+longitude+"";

            // AJAX is <3
            $.ajax({
                type: "GET",
                url: url,
                dataType: "JSON",
                success: function (result) {
                    // reptty self explanatory here link: https://fcc-weather-api.glitch.me/
                    $('#location').text(result.name + ", ");
                    $('#location').append(result.sys.country);
                    rawTemp = result.main.temp;
                    $("#temp").text(Math.floor(rawTemp));
                    $("#desc").text(result.weather[0].description);
                    $("#icon").html('<img src="'+result.weather[0].icon+'" >');
                }
            });
        });
    }


    //convertion of C/F to F/C
    $("#unit").click(function (e) { 
        // just in case prevent default action
        e.preventDefault(); 
        // get the html data for unit
        var $value = $('#unit').html();

        // if its C change to F and apply changes
        if ($value === 'C') {
            $('#unit').html("F")
            var F = Math.floor(rawTemp * 9/5 + 32);
            $('#temp').text(F);
        }

        // if its F change it back to C
        if ($value === 'F') {
            $('#unit').html("C")
            $('#temp').text(Math.floor(rawTemp));
        }
    });
});