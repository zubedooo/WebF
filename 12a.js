function test(n){
  promise = new Promise(function(resolve, reject){
    if (n>10){
      resolve('number is greater than 10');
    }
    else {
      reject('number is less than 10');
    }
  });
return promise;
}
n = prompt("enter the number");
p = test(n);
p.then(function(fromResolve){
  console.log(fromResolve);
});/*.catch(function(fromReject){
    console.log(fromReject);
})*/
