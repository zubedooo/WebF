var express = require('express');
var app=express();
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://127.0.0.1/mydb",function(err,db)
{
if(!err){
console.log("we are connected...");
app.use(express.static('public'));
db.collection('v').insert({party:'congress',vote:0});
db.collection('v').insert({party:'bjp',vote:0});
db.collection('v').insert({party:'nota',vote:0});

app.get('/3b.html', function(req,res)
{
res.sendFile(__dirname+'/'+'3b.html');
});

app.get('/vote',function(req,res)
{
var party=req.query.party;
console.log(party);
var j=db.collection('v').update({party:party},{$inc:{vote:1}});
console.log(j);
res.end(JSON.stringify(req.query));
});

app.get('/display',function(req,res)
{
db.collection('v').find().sort().toArray(
function(err,data){
console.log(data);
res.end(JSON.stringify(data));
});
});

app.listen(4009);
}
});
