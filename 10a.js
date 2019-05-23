const express=require('express')
const app=express();
var count=0;
var logger=(req,res,next)=>{
    req.count=count++;
    console.log(`Logged`);
    next();
}
var visited=(req,res,next)=>{
    console.log(`No of the time visited: ${req.count}`)
    next();
}
app.get('/',[logger,visited],(req,res)=>{
    res.send("Visited : "+req.count);
})
app.listen(3000);
