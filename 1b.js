var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://127.0.0.1/students', function(err, db) {
    if(!err){
        console.log("Connected...")
        app.use(express.static('public'));
        app.get('/1b.html', function(req, res) {
            res.sendFile(__dirname+'/'+'1b.html');
        });
        app.get('/insert', function(req, res) {
            db.collection('student').insert({usn:req.query.usn, name:req.query.name, sub_code:req.query.code, marks:parseInt(req.query.marks)});
            res.end(JSON.stringify(req.query));
        });
        app.get('/display', function(req, res) {
            db.collection('student').find().sort().toArray(function(err, data){
                console.log(data);
                res.end(JSON.stringify(data));
            });
        });
        app.get('/result', function(req, res) {
            db.collection('student').find({marks:{$lt:20}}).sort().toArray(function(err, data){
                console.log(data);
                res.end(JSON.stringify(data));
            });
        });
        app.listen(3000);
    }
});

//1b.html
<!DOCTYPE html>
<html>
    <head>
        Student Database
    </head>
    <body>
        <form action="insert" method="GET">
            USN: <input type="text" name="usn" /><br/>
            Name: <input type="text" name="name" /><br/>
            Subject Code: <input type="text" name="code" /><br/>
            CIE Marks: <input type="text" name="marks" /><br/>
            <input type="submit" name="Submit" />
        </form>
    </body>
</html>
