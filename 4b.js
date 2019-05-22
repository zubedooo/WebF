var express = require('express')
var app = express()

app.use(express.static('public'));

app.get('/index.html', function(req, res){
	res.sendFile(__dirname + '/index.html');
})

app.get('/home.html', function(req, res){
	res.sendFile(__dirname + '/'+'home.html');
})
app.get('/contact.html', function(req, res){
	res.sendFile(__dirname + '/'+'contact.html');
})

app.get('/about.html', function(req, res){
	res.sendFile(__dirname + '/'+'about.html');
})

 app.listen(5000);

//index.html
<html>
<body>
<a href = "home.html">Home</a>
<a href = "about.html">About</a>
<a href = "contact.html">Contact</a>
</body>
</html>

//home.html
<html>
<body> 
this is home
<a href="index.html">Index</a>
</body
</html>

//about.html
<html>
<body> 
this is about
<a href="index.html">Index</a>
</body
</html>

//contact.html
<html>
<body>
 this is contact
<a href="index.html">Index</a>
</body
</html>
