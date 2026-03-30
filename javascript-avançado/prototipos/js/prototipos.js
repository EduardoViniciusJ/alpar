const numbers = [1, 3, 5, 12, 43];

console.log("Array: " + numbers + "\n")

Array.prototype.meuMap = function() {
    const result = []

    for(let i =0; i < this.length; i++){
        result.push(this[i] * 2);
    }

    return result
}
const meuMap = numbers.meuMap();
console.log("MeuMap: " + meuMap)

Array.prototype.meuFilter = function(){
    if (this.length == 0) return "Array vazio!";
    return this[1];
};

const meuFilter = numbers.meuFilter()
console.log("MeuFilter: " + meuFilter) // resultado 3

Array.prototype.meuReduce = function(){
    let result = 0
    for(let i = 0; i < this.length; i++ ){
         result += this[i]
    }
    return result;
}

const meuReduce = numbers.meuReduce()
console.log("MeuReduce: " + meuReduce + "\n"); // resultado 64


const map = numbers.map(n => n*2)
console.log("Map: " + map)

const filter = numbers.filter(n => n===3)[0];
console.log("Filter: " + filter)

const reduce = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("Reduce: " + reduce)




