function bhaskara(a, b, c){

    if(a === 0){
        return "O valor de 'a' não pode ser zero."
    }

    let delta = (b ** 2) - 4 * a * c

    if(delta < 0){
        return "Não existem raízes reais."
    }
    else if(delta === 0){
        const x = -b / (2 * a)
        return `Apenas uma raiz real: x = ${x}`;
    } else{
        const x1 = (-b + Math.sqrt(delta)) / (2 * a)
        const x2 = (-b - Math.sqrt(delta)) / (2 * a)
        return `Duas raízes reais: x1 = ${x1} e x2 = ${x2}`;
    }
} 


console.log(bhaskara(0, 2, 3));  
console.log(bhaskara(1, 2, 3));   
console.log(bhaskara(1, 2, 1));   
console.log(bhaskara(1, -3, 2)); 

