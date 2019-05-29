var express = require('express');
var app = express();

app.get('/index.html', function(req, res) {
    res.sendFile(__dirname+'/index.html');
});
app.get('/cse.html', function(req, res) {
    res.sendFile(__dirname+'/cse.html');
});
app.get('/ise.html', function(req, res) {
    res.sendFile(__dirname+'/ise.html');
});
app.get('/ece.html', function(req, res) {
    res.sendFile(__dirname+'/ese.html');
});

app.listen(3000);

//index.html
<html>
<body bgcolor = "green">
Hello please select your branch! 
<a href = "cse.html">CSE</a>
<a href = "ise.html">ISE</a>
<a href = "ece.html">ECE</a>
</body>
</html>

//cse.html
<html>
<body bgcolor = "red">
<font face="verdana">CSE - Welcome to CSE</font>
<a href = "index.html">Back</a>
</body>
</html>

//ise.html
<html>
<body bgcolor = "blue">
<font face = "Calibri">ISE - Welcome to ISE</font>
<a href = "index.html">Back</a>
</body>
</html>

//ece.html
<html>
<body bgcolor = "yellow">
ECE - Welcome to ECE
<a href = "index.html">Back</a>
</body>
</html>
