
function getTime(iso) {
    if (iso) {
        return iso.substring(11, 16);
    } else {
        return "unknown";
    }
}

function weatherAPI(path, qs, done) {
    $.ajax({
        url: path,
        type: 'GET',
        contentType:'application/json',
        data: qs,
        success: function(data) {
            if (data.message == 401) {
                try {
                    data.data = JSON.parse(data.data);
                } catch(e) {
                }
                done(data);
            } else {
                done(null, data);
            }
        },
        error: function(xhr, textStatus, thrownError) {
            done(textStatus);
        }
    });
    }

    function getLocation() {
    var city = document.getElementById("ciudad").value;
    weatherAPI("/api/forecast/location", { 
        ciudad: city
    }, function(err, data) {
        if (err) {
            alert('error interno');
        } else {
            if (data.location) {
                 document.getElementById("latitud").innerHTML = data.location.latitude[0];
                 document.getElementById("longitud").innerHTML = data.location.longitude[0];
                //$('#latitud').val(data.location.latitude[0]);

                //$("#latitud").html(data.location.latitude[0]);
                //$('#longitud').val(data.location.longitude[0]);
                getResumen();

            } else {
                 alert('error interno');
                    }
        }
        });
    }

     function getResumen() {
        var geo1 = document.getElementById("latitud").innerHTML;
        var geo2 =  document.getElementById("longitud").innerHTML;
        codes = geo1 +','+ geo2;
    weatherAPI("/api/forecast/daily", { 
        geocode: codes
    }, function(err, data) {
        if (err) {
            alert('error interno');
        } else {
            if (data.forecasts) {
                document.getElementById("dia").innerHTML = data.forecasts[0].dow;

                document.getElementById("min").innerHTML = data.forecasts[0].min_temp;

                document.getElementById("max").innerHTML = data.forecasts[0].max_temp;

                document.getElementById("lunar_phase").innerHTML = data.forecasts[0].lunar_phase;

                document.getElementById("amanecer").innerHTML = getTime(data.forecasts[0].sunrise);

                document.getElementById("atardecer").innerHTML = getTime(data.forecasts[0].sunset);

                document.getElementById("moonrise").innerHTML = getTime(data.forecasts[0].moonrise);

                document.getElementById("moonset").innerHTML = getTime(data.forecasts[0].moonset);

                document.getElementById("resumen").innerHTML = data.forecasts[0].narrative;

                document.getElementById("nightrain").innerHTML = data.forecasts[0].night.pop_phrase;

                document.getElementById("dayrain").innerHTML = data.forecasts[0].day.pop_phrase;


               /* $('#dia').val(data.forecasts[0].dow);
                $('#min').val(data.forecasts[0].min_temp);
                $('#max').val(data.forecasts[0].max_temp);
                $('#lunar_phase').val(data.forecasts[0].lunar_phase);
                $('#amanecer ').val(data.forecasts[0].sunrise);
                $('#atardecer').val(data.forecasts[0].sunset);
                $('#moonrise').val(data.forecasts[0].moonrise);
                $('#moonset ').val(data.forecasts[0].moonset);
                $('#resumen').val(data.forecasts[0].narrative);
                $('#nightrain').val(data.forecasts[0].night.pop_phrase);
                //$('#dayrain ').val(data.forecasts[0].day.pop_phrase);*/

            } else {
                 alert('error interno');
                    }
        }
        });
    }
