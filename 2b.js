var express = require('express');
var app = express();
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var urlencodedparser = bodyParser.urlencoded({extended: false});

app.use(express.static('public'));
app.use(expressValidator());
app.get('/2b.html', function(req, res) {
    res.sendFile(__dirname+'/'+'2b.html');
});
app.post('/insert', urlencodedparser, function(req, res) {
    req.checkBody('name', 'Enter name').notEmpty();
    req.checkBody('surname', 'Surname not entered properly').isString();
    req.checkBody('salary', 'Salary must be integer').isInt();

    var errors = req.validationErrors();
    if(errors){
        console.log(errors);
        res.send(errors);
    }
    else{
        console.log(JSON.stringify(req.body));
        res.end(JSON.stringify(req.body));
    }
});

app.listen(3000);

//2b.html
<!DOCTYPE html>
<html>
    <head>
        Employee Database
    </head>
    <body>
        <form action="insert" method="POST">
            ID:  <input type="text" name="id" /><br/>
            Name: <input type="text" name="name" /><br/>
            Surname: <input type="text" name="surname" /><br/>
            Designation: <input type="text" name="des" /><br/>
            Salary: <input type="text" name="salary" /><br/>
            <input type="submit" value="Submit">
        </form>
    </body>
</html>
