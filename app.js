//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');


app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get("/OhmsLaw.html", function (req, res) {
    res.sendFile(__dirname + '/OhmsLaw.html');
});

app.get("/OhmVoltage.html", function (req, res) {
    res.sendFile(__dirname + '/OhmVoltage.html');
})

app.get("/OhmCurrent.html", function (req, res) {
    res.sendFile(__dirname + '/OhmCurrent.html');
})

app.get("/OhmResistance.html", function (req, res) {
    res.sendFile(__dirname + '/OhmResistance.html');
})

app.get("/MotorSpeed.html", function (req, res) {
    res.sendFile(__dirname + '/MotorSpeed.html');
})


app.post("/OhmVoltage.html", function (req, res) {
    // console.log(req.body);
    var I = req.body['current'];
    var R = req.body['resistance'];
    var V = I * R;
    V = V.toFixed(3);
    res.render("OhmsLawAnswer", {
        quan: 'Voltage',
        ans: V,
        units: 'V'
    });
})

app.post("/OhmCurrent.html", function (req, res) {
    // console.log(req.body);
    var V = req.body['voltage'];
    var R = req.body['resistance'];
    var I = V / R;
    I = I.toFixed(3);
    res.render("OhmsLawAnswer", {
        quan: 'Current',
        ans: I,
        units: 'A'
    });
})

app.post("/OhmResistance.html", function (req, res) {
    // console.log(req.body);
    var V = req.body['voltage'];
    var I = req.body['current'];
    var R = V / I;
    R = R.toFixed(3);
    res.render("OhmsLawAnswer", {
        quan: 'Resistance',
        ans: R,
        units: 'Ω'
    });
})

app.post("/MotorSpeed.html", function (req, res) {
    // console.log(req.body);
    var F = req.body['frequency'];
    var P = req.body['poles'];
    var N = 120 * F / P;
    res.render("MotorSpeedAnswer", {
        quan: 'Speed',
        ans: N,
        units: 'rpm'
    });
})



app.listen(3000, function () {
    console.log("App is running on port 3000")
});