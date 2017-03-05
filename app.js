var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var fs = require('fs')
var app = express();
var schema = mongoose.Schema;

app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost:28001/RG_New_People/", function (err) {
    if (err) {
        console.log('DB Error!')
        throw err
    }
    else {
        console.log('DB Connect Success!')
    }
})

var NewSchema = new schema({
    name: {
        type: String
    },
    num: {
        type: String
    },
    contact: {
        type: String
    },
    why: {
        type: String
    },
    self: {
        type: String
    },
    gua: {
        type: String
    },
    clas: {
        type: String
    }
})

var New = mongoose.model('people', NewSchema);

app.listen(8989, function (err) {
    if (err) {
        console.log('Server Error!')
        throw err
    }
    else {
        console.log('Server Running At 3000!')
    }
})

app.post('/newpeople', function (req, res) {
    var people = new New({
        name: req.param('name'),
        num : req.param('num'),
        contact : req.param('contact'),
        why : req.param('why'),
        self : req.param('self'),
        gua : req.param('gua'),
        clas : req.param('clas')
    })

    New.findOne({
        phonenum: req.param('contact')
    }, function (err, result) {
        if (err) {
            console.log('/newpeople Error!')
            throw err
        }
        else if (result) {
            res.json({
                success: false,
                message: "Already In Database"
            })
        }
        else {
            people.save(function (err) {
                if (err) {
                    console.log('save Error!')
                    throw err
                }
                else {
                    res.json({
                        success: true,
                        message: "Save Success"
                    })
                }
            })
        }
    })
})

