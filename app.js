//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require('https');
const url = 'https://api.genderize.io/?name=';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
var userCount = 1;

app.get("/", function (req, res) {
    // res.sendFile(__dirname + '/index.html');
    userCount = userCount + 1;
    res.render("index", {
        userCount: userCount
    })
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

app.get("/CurrentLaw.html", function (req, res) {
    res.sendFile(__dirname + '/CurrentLaw.html');
})

app.get("/PowerLaw.html", function (req, res) {
    res.sendFile(__dirname + '/PowerLaw.html');
});

app.get("/PowerWithVI.html", function (req, res) {
    res.sendFile(__dirname + '/PowerWithVI.html');
});

app.get("/PowerWithIR.html", function (req, res) {
    res.sendFile(__dirname + '/PowerWithIR.html');
});

app.get("/PowerWithVR.html", function (req, res) {
    res.sendFile(__dirname + '/PowerWithVR.html');
});

app.get("/GenderPrediction.html", function (req, res) {
    res.sendFile(__dirname + '/GenderPrediction.html');
});

app.get("/PowerFactor.html", function (req, res) {
    res.sendFile(__dirname + '/PowerFactor.html');
});

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

app.post("/CurrentLaw.html", function (req, res) {
    // console.log(req.body);
    var In = req.body['In'];
    var Out = req.body['Out'];
    var direction = 'Incoming';
    var Ans = 0;
    if (In > Out) {
        Ans = In - Out;
        direction = 'Outgoing';
    }
    else if (In === Out) direction = '';
    else Ans = Out - In;
    res.render("CurrentLawAnswer", {
        quan: 'Current',
        ans: Ans,
        units: direction
    });
})

app.post("/PowerWithVI.html", function (req, res) {
    // console.log(req.body);
    var V = req.body['voltage'];
    var I = req.body['current'];
    var P = V * I;
    P = P.toFixed(2);
    res.render("PowerLawAnswer", {
        quan: 'Power',
        ans: P,
        units: 'W'
    });
})

app.post("/PowerWithIR.html", function (req, res) {
    // console.log(req.body);
    var I = req.body['current'];
    var R = req.body['resistance'];
    var P = I * I * R;
    P = P.toFixed(2);
    res.render("PowerLawAnswer", {
        quan: 'Power',
        ans: P,
        units: 'W'
    });
})

app.post("/PowerWithVR.html", function (req, res) {
    var V = req.body['voltage'];
    var R = req.body['resistance'];
    var P = V * V / R;
    P = P.toFixed(2);
    res.render("PowerLawAnswer", {
        quan: 'Power',
        ans: P,
        units: 'W'
    });
})

app.post("/GenderPrediction.html", function (req, res) {
    var givenName = req.body['givenName'];
    var name = givenName.toLowerCase();
    var resGender = '';
    const request = https.request(url + name, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            resGender = body['gender'];
            // console.log(body['gender']);
            res.render("GenderAnswer", {
                name: givenName,
                gender: resGender
            })
        });
    })

    request.on('error', (error) => {
        console.log('An error', error);
    });
    request.end();
})

app.post("/PowerFactor.html", function (req, res) {
    // console.log(req.body);
    var W = req.body['realPower'];
    var VI = req.body['apperantPower'];
    var PF = W / VI;
    PF = PF.toFixed(3);
    res.render("PowerFactorAnswer.ejs", {
        ans: PF
    })
})
app.listen(3000, function () {
    console.log("App is running on port 3000")
});