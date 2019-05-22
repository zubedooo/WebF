var express = require('express');  
var app = express();  
var expressValidator=require('express-validator');
var bodyParser=require('body-parser');
var uep=bodyParser.urlencoded({extended: false});
app.use(express.static('public'));  
app.use(expressValidator());
app.get('/2b.html', function(req,res)
{
res.sendFile(__dirname+'/'+'2b.html');
});

app.post('/insert',uep,function(req,res)
{
req.checkBody('namee','Should NOT be empty').notEmpty();
req.checkBody('marks','Should be number').isInt();
var errors=req.validationErrors();

if(errors)
{
	console.log(errors);
	res.send(errors);
}

else
{
console.log(JSON.stringify(req.body));
res.end(JSON.stringify(req.body));
}

});

app.listen(4005);
