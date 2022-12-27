//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


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
    res.send("Voltage is  " + V);
})

app.post("/OhmCurrent.html", function (req, res) {
    // console.log(req.body);
    var V = req.body['voltage'];
    var R = req.body['resistance'];
    var I = V / R;
    res.send("Current is  " + I);
})

app.post("/OhmResistance.html", function (req, res) {
    // console.log(req.body);
    var V = req.body['voltage'];
    var I = req.body['current'];
    var R = V / I;
    res.send("Resistance is  " + R);
})

app.post("/MotorSpeed.html", function (req, res) {
    console.log(req.body);
    var F = req.body['frequency'];
    var P = req.body['poles'];
    var N = 120 * F / P;
    res.send("Speed of motor is " + N);
})


app.listen(3000, function () {
    console.log("App is running on port 3000")
});