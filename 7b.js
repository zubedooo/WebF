var express=require('express')
var app=express()
var body=require('body-parser')
var MongoClient=require('mongodb').MongoClient
app.use(body.urlencoded({extended:false}))
app.use(body.json())

MongoClient.connect('mongodb://127.0.0.1/students',function(err,db)
{
	if(!err)
	{
		app.use(express.static('public'))
		console.log('successfully Connected to db')
		app.get('/',function(req,res)
		{
			res.sendFile(__dirname+'/public/index7.html')
		})
		app.get('/insert',function(req,res)
		{
			res.sendFile(__dirname+'/public/insert7.html')
		})
		app.listen(5000)
		app.post('/process_post',function(req,res)
		{
			console.log(req.body)
			res.setHeader('Content-Type', 'text/html')
			console.log('Inside process')
			var obj={'name':req.body.stuname,'usn':req.body.stuusn,'grade':req.body.grade}
			db.collection('student_7b').insertOne(obj,function(req,res)
			{
				console.log('successfully Inserted')
			})
			res.end('successful insertion -->'+JSON.stringify(req.body))
		})
		app.get('/display',function(req,res)
		{
			db.collection('student_7b').find().toArray(function(err,i)
			{
				if(!err)
				{
					res.render('disp.ejs',{students:i})
				}
			})
		})
	}
})

//public/index7.html
<html>
<head>
	<h3>EXAM SYSTEM</h3>
	<script src='public/angular/angular.min.js'></script>
</head>
<body ng-app=''>
	<a href='insert'>Insert</a></br>
	<a href='display'>Display</a></br>
</body>
</html>


//public/insert7.html
<html>
<head>
	<script src='public/angular/angular.min.js'></script>
	<script>
	var myModule=angular.module("myapp",[])
	myModule.controller('mycontroller',function($scope,$http)
	{
		$scope.data={}
		$scope.response={}
		$scope.send=function()
		{
			var posting=$http({
				method:"POST",
				url:"/process_post",
				data:$scope.data
			}).then(function(response)
			{
				console.log(response)
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
		Student Name<input type="text" ng-model="data.stuname"/><br>
		Student USN<input type="text" ng-model="data.stuusn"/><br>
		Grade<input type="text" ng-model="data.grade"/><br>
		<input type="submit">
		<div><pre>{{response.data}}<pre></div>
	</form>
</body>
</html>
