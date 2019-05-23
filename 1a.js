function fixStart(s){
    var t = s.split("")
    for(var i=1; i<t.length; i++){
        if (t[i] == t[0]){
            t[i] = '*'
        }
    }
    return t
}

fixStart('babble').join("")
