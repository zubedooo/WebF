var express = require('express');
var app = express();

app.get('/6bindex.html', function(req, res) {
    res.sendFile(__dirname+'/6bindex.html');
});
app.get('/6bcse.html', function(req, res) {
    res.sendFile(__dirname+'/6bcse.html');
});
app.get('/6bise.html', function(req, res) {
    res.sendFile(__dirname+'/6bise.html');
});
app.get('/6bece.html', function(req, res) {
    res.sendFile(__dirname+'/6bese.html');
});

app.listen(3000);

//index.html
<!DOCTYPE html>
<html>
    <head>
        <h1 style="color: blue">Home PAGE</h1>
    </head>
    <body>
        <a href="6bcse.html"><h3>CSE</h3></a><br/>
        <a href="6bise.html"><h3>ISE</h3></a><br/>
	<a href="6bece.html"><h3>ECE</h3></a>
    </body>
</html>

//6bcse.html
<!DOCTYPE html>
<html>
    <head>
        <h1 style="color: blue">Computer Science</h1>
    </head>
    <body>
        <p style="color: green; font-family:verdana; font-size:120%"; >This is CSE Dep.</p><br/>
        <a href="6bindex.html"><h3>Home</h3></a>
    </body>
</html>

//6bise.html
<!DOCTYPE html>
<html>
    <head>
        <h1 style="color: red">ISE</h1>
    </head>
    <body>
        <p style="color: yellow; font-family:courier; font-size:150%;">This is ISE Dept</p>
        <a href="6bindex.html"><h3>Home</h3></a>
    </body>
</html>
//6bece.html
<!DOCTYPE html>
<html>
    <head>
        <h1 style="color: blue">ECE Branch</h1>
    </head>
    <body>
        <p style="color: magenta; font-family:verdana; font-size:120%"; >This is ECE Dep.</p><br/>
        <a href="6bindex.html"><h3>Home</h3></a>
    </body>
</html>
