//do node 9b.js
//goto link localhost:5000/9b.html, fill details and submit
//goto localhost:5000/display to view results

var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;

mongoClient.connect("mongodb://127.0.0.1/myDB", function(err, db) {
    if(!err) {
        console.log("Connected...");
        app.use(express.static('public'));
        app.get('/9b.html', function(req, res) {
            res.sendFile(__dirname+'/'+'9b.html');
        });
        app.get('/insert', function(req, res) {
            db.collection('student').insert({name:req.query.name, branch:req.query.branch, semester:req.query.sem});
            res.end(JSON.stringify(req.query));
        });
        app.get('/display', function(req, res) {
            db.collection('student').find({branch:'cse', semester:'6'}).sort().toArray(function(err, data) {
                console.log(data);
                res.end(JSON.stringify(data));
            });
        });
        app.listen(5000);
    }
    else{
        console.log(err)
    }
});
