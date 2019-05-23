function testNum(n){
    var promise = Promise.resolve(n);
    return promise;
}
var n = prompt("Enter a number");
var p = testNum(n);

p.then(function(value) {
    if(value>10){
        console.log("Greater than 10");
    }
    else if(value<10){
        console.log("Less than 10")
    }
});
