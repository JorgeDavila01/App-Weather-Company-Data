var express = require('express');
var request = require('request');
var cfenv = require('cfenv');

//Security - helmet
var helmet = require('helmet');

//setup middleware
var app = express();
var ninetyDaysInMilliseconds = 7776000000;

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  // set the HTTP Strict Transport Security (HSTS) header for 90 days	
  app.use(helmet.hsts({
	  maxAge: ninetyDaysInMilliseconds,
	  includeSubdomains: true,
	  force: true
  }));
  // Prevent Cross-site scripting (XSS) attacks
  app.use(helmet.xssFilter());  
});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
var weather_host = appEnv.services["weatherinsights"] 
        ? appEnv.services["weatherinsights"][0].credentials.url // Weather credentials passed in
        : "https://7654d3ee-81f1-4ea4-8d68-4c16bbd45a87:g2N8ThTJwm@twcservice.mybluemix.net"; // or copy your credentials url here for standalone

function weatherAPI(path, qs, done) {
    var url = weather_host + path;
    console.log(url, qs);
    request({
        url: url,
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        },
        qs: qs
    }, function(err, req, data) {
        if (err) {
            done(err);
        } else {
            if (req.statusCode >= 200 && req.statusCode < 400) {
                try {
                    done(null, JSON.parse(data));
                } catch(e) {
                    console.log(e);
                    done(e);
                }
            } else {
                console.log(err);
                done({ message: req.statusCode, data: data });
            }
        }
    });
}

app.get('/api/forecast/daily', function(req, res) {
    var geocode = (req.query.geocode || "45.43,-75.68").split(",");
    weatherAPI("/api/weather/v1/geocode/" + geocode[0] + "/" + geocode[1] + "/forecast/daily/3day.json", {
        units: "m",
        language: "es"
    }, function(err, result) {
        if (err) {
        	console.log(err);
            res.send(err).status(400);
        } else {
        	console.log("datos abtenidos");
            res.json(result);
        }
    });
});

app.get('/api/forecast/location', function(req, res) {
    ///api/weather/v3/location/search?query=Atlanta&locationType=city&language=es-MX
    weatherAPI("/api/weather/v3/location/search",{
        query: req.query.ciudad || "bogota",
        locationType:"city",
        language: "es"
    }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err).status(400);
        } else {

            console.log("datos abtenidos");
            res.json(result);
        }
    });
});


app.listen(appEnv.port, appEnv.bind, function() {
  console.log("server starting on " + appEnv.url);
});

