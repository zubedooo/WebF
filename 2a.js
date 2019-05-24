function netPrice(s){
    products = {p1:100, p2:210, p3:212, p4:533, p5:7654};
    if(s=="p1"){
        var cost = products.p1;
    }
    else if(s=="p2"){
        var cost = products.p2;
    }
    else if(s=="p3"){
        var cost = products.p3;
    }
    else if(s=="p4"){
        var cost = products.p4;
    }
    else if(s=="p5"){
        var cost = products.p5;
    }
    function addTax(){
        var net = parseFloat(cost*1.18);
        console.log(net);
    }
    return addTax;
}

var a = prompt("Select a product\np1\np2\np3\np4\np5");
var func = netPrice(a);
func();
