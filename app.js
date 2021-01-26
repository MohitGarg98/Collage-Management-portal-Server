var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const mongoose = require('mongoose');

var app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost:27017/collagedb", {useNewUrlParser: true});

app.use('/public', express.static(__dirname+'/public'));

app.use('/', require('./routes'));

app.listen(9000, function (err) {
    if(err){console.log(err); return}
    else{
        console.log('Server runnning on port 9000');
    }
})