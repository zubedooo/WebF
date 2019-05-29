var express = require('express')
var app = express()
app.use(express.static('public'))

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
})
app.get('/karnataka.html', function(req, res){
	res.sendFile(__dirname + '/karnataka.html')
})
app.get('/maharastra.html', function(req, res){
	res.sendFile(__dirname + '/maharastra.html')
})

app.get('/delhi.html', function(req, res){
	res.sendFile(__dirname + '/delhi.html')
})
var server = app.listen(5000)

//index.html
<html>
<body bgcolor = "green">
Hello
<a href = "karnataka.html">Karnataka</a>
<a href = "delhi.html">Delhi</a>
<a href = "maharashtra.html">Maharashtra</a>
</body>
</html>

//karnataka.html
<html>
<body bgcolor = "blue">
<font face = "Calibri">KARANATAKA - You are now in Hampi</font>
</body>
</html>

//delhi.html
<html>
<body bgcolor = "red">
<font face="verdana">DELHI - Welcome to Red Fort</font>
</body>
</html>

//maharashtra.html
<html>
<body bgcolor = "yellow">
MAHARASHTRA - Home of Mumbai Indians
</body>
</html>
