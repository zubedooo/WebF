var express=require('express')
var app=express()
var body=require('body-parser')
app.use(body.urlencoded({extended:false}))
app.use(body.json())
app.use(express.static('public'))
var MongoClient=require('mongodb').MongoClient

MongoClient.connect("mongodb://127.0.0.1:27017/nodedb",function(err,db)
{
	if(!err)
	{
		console.log('Connected to DB')
		app.get('/',function(req,res)
		{
			res.sendFile(__dirname+'/public/index12.html')
		})

		app.get('/insert',function(req,res)
		{
			res.sendFile(__dirname+'/public/insert12.html')
		})

		app.post('/process_post',function(req,res)
		{
			console.log('Working')
			obj={"usn":req.body.usn,"name":req.body.name,"marks":parseInt(req.body.marks)}
			db.collection('student_12b').insertOne(obj,function(err,db)
			{
				if(!err)
				{
					console.log('Document added successfully')
					res.send('Document added ---> '+JSON.stringify(req.body))
				}
			})
		})

		app.get('/display',function(req,res)
		{
			db.collection('student_12b').find({"marks":{$lt:20}}).toArray(function(err,i)
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

//public/index12.html
<html>
<head>
	<h3>STUDENT DATABASE MANAGEMENT SYSTEM</h3>
</head>
<body>
<a href='insert'>Insert Data</a><br>
<a href='display'>Display NE</a><br>
</body>
</html>

//public/insert12.html
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
			console.log($scope.data.usn)
			var sending=$http({
				method:"POST",
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
		USN<input type="text" ng-model="data.usn"><br>
		Name<input type="text" ng-model="data.name"><br>
		Marks<input type="text" ng-model="data.marks"><br>
		<input type="submit">
		<div>{{response.data}}</div>
	</form>
</body>
</html>
