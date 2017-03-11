var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var crypto = require('crypto')
var session = require('express-session')
var fs = require('fs')
var ejs = require('ejs')
var app = express();
var schema = mongoose.Schema;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

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
        console.log('Server Running At 8989 Port!')
    }
})

app.get('/', function (req, res) {
    res.redirect('/register')
})

app.get('/register', function (req, res) {
    req.session.destroy(function () {
        req.session;
    });
    fs.readFile('questionnaire.html', 'utf-8', function (err, data) {
        res.send(data)
    })
})

app.post('/newpeople', function (req, res) {
    var people = new New({
        name: req.param('name'),
        num: req.param('num'),
        contact: req.param('contact'),
        why: req.param('why'),
        self: req.param('self'),
        gua: req.param('gua'),
        clas: req.param('clas')
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

app.get('/password', function (req, res) {
    req.session.destroy(function () {
        req.session;
    });
    fs.readFile('password.html', 'utf-8', function (err, data) {
        res.send(data)
    })
})

app.post('/password', function (req, res) {
    var body = req.body;
    if (body.password == 0927) {
        req.session.login = 'adsf';
        res.redirect('/readjung')
    }
    else {
        res.redirect('/password')
    }
})

app.get('/readpeople', function (req, res) {
    New.find({}, function (err, result) {
        if(err){
            console.log('/dataget Error!')
            throw err
        }
        else if(result){
            if(req.session.login == undefined){
                res.redirect('/password')
            }
            else {
                console.log(result)
                fs.readFile('read.html', 'utf-8', function (err, data) {
                    res.send(ejs.render(data, {
                        data: result
                    }));
                })
            }
        }
    })
})