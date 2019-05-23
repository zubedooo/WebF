//node 10a.js
//Go to browser. Type in localhost:3000 
//refresh to get count increasing
//
var express = require('express')
const app = express()
var count = 0

var Logger = (req, res, next)=>{
    req.count = count++
    console.log(count)
    next()
}
var visited = (req, res, next)=>{
    console.log(`No of times visited: , ${req.count}`)
    next()
}
app.use(Logger)
app.use(visited)
app.get('/', (req, res)=>{
    res.send("visited: "+req.count)
})

app.listen(3000)
