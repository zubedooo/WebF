var express = require('express');
var app=express();
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://127.0.0.1/mydb",function(err,db)
{
 if(!err)
{
console.log("we are connected...");
app.use(express.static('public'));

app.get('/1b.html', function(req,res)
{
res.sendFile(__dirname+'/'+'1b.html');
});

app.get('/insert',function(req,res)
{
var usn=req.query.usn;
var namee=req.query.namee;
var scode=req.query.scode;
var marks=parseInt(req.query.marks);
db.collection('student').insert({usn:usn,name:namee,scode:scode,marks:marks});
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

app.get('/displaylt',function(req,res)
{
db.collection('student').find({marks:{$lt:20}}).sort().toArray(
function(err,data){
console.log(data);
res.end(JSON.stringify(data));
});
});

app.listen(4005);
}
});
