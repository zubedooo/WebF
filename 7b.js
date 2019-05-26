var express=require('express')
var mongoclient=require('mongodb').MongoClient
var bodyparser=require('body-parser')
var app=express()
var urlencoded=bodyparser.urlencoded({extended:false})
app.use(bodyparser.json())
app.use(express.static('public'));

mongoclient.connect("mongodb://127.0.0.1/student",function(err,db){
	if(err){
		console.log(err);
	}
    app.get('/',function(req,res){
        res.sendFile(__dirname+"/public/"+"index7.html")
    });
    app.get('/insert',(req,res)=>{
        res.sendFile(__dirname+"/public/"+"insert7.html")
    });
    
    app.post('/process_post',function(req,res){
        console.log('process')
        req.body.Message="Sending Data";
        console.log(req.body);
        var grade=req.body.grade
        var name=req.body.name
        db.collection('s').insert({name:name,grade:grade});
        res.send("Student Data Record --->  "+JSON.stringify(req.body))
    });
    app.get('/display',(req,res)=>{
        db.collection('s').find({grade:'S'}).toArray(function(err,data){
                data.forEach(element => {
                    res.send(element);
                });
        })
    })
    app.listen(5000);
});

//public/index7.html
<html>
    <head>
        <script src="angular/angular.min.js"></script>
    </head>
    <body ng-app="myapp">
        <h1>Exam Management System</h1> <br/>
        <a href="/insert">Insert</a><br/>
        <a href="/display">Display</a><br/>
    </body>
</html>

//public/insert7.html
<html>
    <head>
        <script src="angular/angular.min.js"></script>
    </head>
    <body ng-app="myapp">
        <h1>Student Detail Entry</h1> <br/>
        <form ng-controller="appcontroller" ng-submit="send()">
            <h3>Name: </h3><input type="text"  ng-model="data.name"/><br/>
            <h3>Grade: </h3><input type="text"  pattern="[ABCS]" ng-model="data.grade"/><br/>
            <input type="submit"/>
            <div>{{response.data}}</div>
        </form>
        <a href="/">Go back</a>
        <script>
            var info=angular.module("myapp",[])
            info.controller("appcontroller",($scope,$http)=>{
                $scope.data={}
                $scope.response={}
                $scope.send=function(){
                    var posting=$http({
                        method:'POST',
                        url:'/process_post',
                        data:$scope.data,
                    }).then((response)=>{
                        $scope.response.data=response.data;
                    },
                    (error)=>{
                        console.log(error);
                    });
                }
            });
        </script>
    </body>
</html>
