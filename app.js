var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express();
var schema = mongoose.Schema;

app.use(bodyParser.urlencoded({
    extended : true
}));


