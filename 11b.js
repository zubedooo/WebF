var express=require('express')
var app=express()
var body=require('body-parser')
var MongoClient=require('mongodb').MongoClient
app.use(body.urlencoded({extended:false}))
app.use(body.json())
app.use(express.static('public'))
MongoClient.connect("mongodb://127.0.0.1/nodedb",function(err,db)
{
	if(!err)
	{
		console.log('Connected to db')
		app.get('/',function(req,res)
		{
			res.sendFile(__dirname+'/public/index11.html')
		})
		app.get('/insert',function(req,res)
		{
			res.sendFile(__dirname+'/public/insert11.html')
		})
		app.post('/process_post',function(req,res)
		{
			console.log('Processing post request')
			var obj={"usn":req.body.usn,"name":req.body.name,"attendence":parseInt(req.body.attendence)}
			db.collection('student_11b').insertOne(obj,function(err,db)
			{
				if(!err)
				{
					console.log('Document inserted')
				}
			})

			res.end("Document inserted into attendence db -->"+JSON.stringify(req.body))
		})

		app.get('/display',function(req,res)
		{
			db.collection('student_11b').find({"attendence":{$lt:75}}).toArray(function(err,i)
			{
				if(!err)
				{
					res.render("disp.ejs",{students:i})
				}
			})
		})

		app.listen(5000)
	}
})

//public/index11.html
<html>
<head>
	<h3>ATTENDENCE MANAGEMENT SYSTEM</h3>
	<script src='angular/angular.min.js'></script>
</head>
<body ng-app=''>
	<a href='insert'>Insert</a><br>
	<a href='display'>Display</a><br>
</body>
</html>

//public/insert11.html
<!DOCTYPE html>
<html>
<head>
	<script src="angular/angular.min.js"></script>
	<script>
	var myModule=angular.module("myapp",[])
	myModule.controller("mycontroller",function($scope,$http)
	{
		$scope.data={}
		$scope.response={}
		$scope.send=function()
		{
			console.log('Sending data to Node Server')
			var posting=$http({
				method:'POST',
				url:"/process_post",
				data:$scope.data
			}).then(function(response)
			{
				console.log(response.data)
				$scope.response.data=response.data
			},function(error)
			{
				console.log(error)
			})
		}
	})
	</script>
</head>
<body ng-app="myapp" ng-controller="mycontroller">
	<form ng-submit="send()">
		USN: <input type="text" ng-model="data.usn"><br>
		Name: <input type="text" ng-model="data.name"><br>
		Attendence: <input type="text" ng-model="data.attendence"><br>
		<input type="submit">
		<div>{{response.data}}</div>
	</form>
</body>
</head>
