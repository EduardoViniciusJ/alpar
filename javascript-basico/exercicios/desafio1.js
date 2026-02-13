function bhaskara(a, b, c){
    let delta = (b ** 2) - 4 * a * c

   if (delta < 0) {
        return "Não existem raízes reais";
   }

    let x1 = (-b + Math.sqrt(delta)) / (2 * a);
    let x2 = (-b - Math.sqrt(delta)) / (2 * a);

    return `x1 = ${x1} e x2 = ${x2}`;
} 


console.log(bhaskara(1, -3, 2));
console.log(bhaskara(1, 2, 1));
console.log(bhaskara(1, 2 ,3))

