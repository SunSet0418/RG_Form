var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express();
var schema = mongoose.Schema;

app.use(bodyParser.urlencoded({
    extended : true
}));

mongoose.connect("mongodb://localhost/RG_New_People/", function (err) {
    if(err){
        console.log('DB Error!')
        throw err
    }
    else {
        console.log('DB Connect Success!')
    }
})

var NewSchema = new schema({
    name : {
        type : String
    },
    phonenum : {
        type : String
    },
    department : {
        type : String
    },
    email : {
        type : String
    }
})

var New = mongoose.model('people', NewSchema);

app.listen(8989, function (err) {
    if(err){
        console.log('Server Error!')
        throw err
    }
    else {
        console.log('Server Running At 8989!')
    }
})

app.get('/', function (req, res) {
    res.redirect('/newpeople')
})

app.post('/newpeople', function (req, res) {
    var people = new New({
        name : req.param('name'),
        phonenum : req.param('phonenum'),
        department : req.param('department'),
        email : req.param('email')
    })

    New.findOne({
        phonenum : req.param('phonenum')
    }, function (err, result) {
        if(err){
            console.log('/newpeople Error!')
            throw err
        }
        else if(result){
            res.json({
                success : false,
                message : "Already In Database"
            })
        }
        else {
            people.save(function (err) {
                if(err){
                    console.log('save Error!')
                    throw err
                }
                else {
                    res.json({
                        success : true,
                        message : "Save Success"
                    })
                }
            })
        }
    })
})

