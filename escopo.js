let variavelGlobal = 2
var variavellocal = 3

if(true){
    variavelGlobal++;
    console.log("Global (if): " + variavelGlobal)

    let variavellocal = 2;
    console.log("Local (if): " + variavellocal)

}
console.log("Global: " + variavelGlobal)
console.log("Local: " + variavellocal) 