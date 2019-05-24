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

//2b.html
<html>
<head>
<title>Student detail</title>
</head>
<body>
<form action="insert" method="post">
USN <input type="text" id="usn" name="usn"><br>
Name <input type="text" id="namee" name="namee"><br>
Branch <input type="text" id="branch" name="branch"><br>
Marks <input type="text" id="marks" name="marks"><br>
<input type="submit" value="submit">
</form>
</body>
</html>
