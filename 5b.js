var express = require('express');
var app=express();
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://127.0.0.1/mydb",function(err,db)
{
 if(!err){
console.log("we are connected...");
app.use(express.static('public'));

app.get('/i5b.html', function(req,res)
{
res.sendFile(__dirname+'/'+'i5b.html');
});

app.get('/u5b.html', function(req,res)
{
res.sendFile(__dirname+'/'+'u5b.html');
});

app.get('/insert',function(req,res)
{
var usn=req.query.usn;
var namee=req.query.namee;
var branch=req.query.branch;
var grade=req.query.grade;
db.collection('student').insert({usn:usn,name:namee,branch:branch,grade:grade});
res.end(JSON.stringify(req.query));
});

app.get('/update',function(req,res)
{
var namee=req.query.namee;
var grade=req.query.grade;
var j=db.collection('student').update({name:namee},{$set:{grade:grade}});
res.end(JSON.stringify(req.query));
});

app.get('/display',function(req,res)
{
db.collection('student').find().sort().toArray(
function(err,data){
console.log(data);
res.end(JSON.stringify(data));
});
});

app.listen(4009);   }                
});
