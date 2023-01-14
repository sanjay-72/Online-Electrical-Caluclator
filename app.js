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
    myNum = Math.random() * 3;
    myNum = Math.round(myNum);
    userCount = userCount + myNum;
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

app.get("/BillEstimator.html", function (req, res) {
    res.sendFile(__dirname + '/BillEstimator.html');
});

app.get("/WireThickness.html", function (req, res) {
    res.sendFile(__dirname + '/WireThickness.html');
});

app.get("/EarthResistance.html", function (req, res) {
    res.sendFile(__dirname + '/EarthResistance.html');
});

app.get("/ElectricityConsumption.html", function (req, res) {
    res.sendFile(__dirname + '/ElectricityConsumption.html')
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
    if (P % 2 == 0) {
        var N = 120 * F / P;
        res.render("MotorSpeedAnswer", {
            quan: 'Speed',
            ans: N,
            units: 'rpm'
        });
    }
    else {
        res.render("MotorSpeedAnswer", {
            quan: 'Speed',
            ans: 'wrongly determined because the poles should even in number.',
            units: ''
        });
    }

});

app.post("/CurrentLaw.html", function (req, res) {
    console.log(req.body);
    var In = Number(req.body['In']);
    var Out = Number(req.body['Out']);
    var direction = 'Incoming';
    var Ans = 0;
    if (In > Out) {
        Ans = In - Out;
        console.log("In>Out");
        direction = 'Outgoing';
    }
    else if (In === Out) direction = '';
    else if (In < Out) {
        Ans = Out - In;
    }
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

app.post("/BillEstimator.html", function (req, res) {
    // console.log(req.body);
    var units = req.body['units'];
    var cost = req.body['cost'];
    var dues = req.body['dues'];
    var bill = units * cost + (+dues);
    res.render("BillEstimatorAnswer", {
        units: units,
        ans: bill,
        dues: dues
    })
})

app.post("/WireThickness.html", function (req, res) {
    // console.log(req.body);
    var current = Number(req.body['current']);
    if (current > 0) {
        if (current < 6) res.render("WireThicknessAnswer", {
            ans: "You need 0.5 Sq.mm copper wire"
        })
        else if (current < 11)
            res.render("WireThicknessAnswer", {
                ans: "You need 0.75 Sq.mm copper wire"
            })
        else if (current < 16)
            res.render("WireThicknessAnswer", {
                ans: "You need 1.0 Sq.mm copper wire"
            })
        else if (current < 22)
            res.render("WireThicknessAnswer", {
                ans: "You need 1.5 Sq.mm copper wire"
            })
        else if (current < 28)
            res.render("WireThicknessAnswer", {
                ans: "You need 2.5 Sq.mm copper wire"
            })
        else if (current < 42)
            res.render("WireThicknessAnswer", {
                ans: "You need 4.0 Sq.mm copper wire"
            })
        else if (current < 52)
            res.render("WireThicknessAnswer", {
                ans: "You need 6.0 Sq.mm copper wire"
            })
        else
            res.render("WireThicknessAnswer", {
                ans: "Sorry, please verify standard table to determine."
            })
    }
    else
        res.render("WireThicknessAnswer", {
            ans: "Sorry, please enter a valid value of current."
        })
})


app.post("/ElectricityConsumption.html", function (req, res) {
    // console.log(req.body);
    var TubeLightN = req.body['TubeLightN'], TubeLightW = req.body['TubeLightW'],
        TubeLightU = req.body['TubeLightU'], FanN = req.body['FanN'], FanW = req.body['FanW'],
        FanU = req.body['FanU'], LedlightsN = req.body['LedlightsN'], LedlightsW = req.body['LedlightsW'],
        LedlightsU = req.body['LedlightsU'], GeyserN = req.body['GeyserN'], GeyserW = req.body['GeyserW'],
        GeyserU = req.body['GeyserU'], ChargersN = req.body['ChargersN'], ChargersW = req.body['ChargersW'],
        ChargersU = req.body['ChargersU'], PurifierN = req.body['PurifierN'], PurifierW = req.body['PurifierW'],
        PurifierU = req.body['PurifierU'], TelevisionN = req.body['TelevisionN'],
        TelevisionW = req.body['TelevisionW'], TelevisionU = req.body['TelevisionU'],
        acN = req.body['acN'], acW = req.body['acW'], acU = req.body['acU'], OtherN = req.body['OtherN'],
        OtherW = req.body['OtherW'], OtherU = req.body['OtherU'];
    var ans = TubeLightN * TubeLightU * TubeLightW + FanN * FanU * FanW +
        LedlightsN * LedlightsU * LedlightsW + GeyserN * GeyserU * GeyserW +
        ChargersN * ChargersU * ChargersW + PurifierN * PurifierU * PurifierW +
        TelevisionN * TelevisionU * TelevisionW + acN * acU * acW + OtherN * OtherU * OtherW;
    res.render("ElectricityConsumptionAnswer", {
        quan: 'Energy Consumption',
        ans: ans,
        units: 'KWH'
    });
})

app.listen(80, function () {
    console.log("App is running on port 80")
});

