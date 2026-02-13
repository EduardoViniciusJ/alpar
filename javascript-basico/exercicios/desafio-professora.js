function calcularProduto(precoOriginal, temDesconto) {

    const desconto = 0.10;
    const icms = Math.random() * (25 - 12) + 12;

    let precoBase = precoOriginal;

    let precoComDesconto = precoOriginal;

    if (temDesconto == true) {
        precoComDesconto = precoOriginal - (precoOriginal * desconto);
        precoBase = precoComDesconto; 
    }

    const valorImposto = precoBase * (icms / 100);
    const precoFinal = precoBase + valorImposto;

    return `Preco Original: R$ ${precoOriginal.toFixed(2)} | Desconto: ${temDesconto} | Preço com Desconto: R$ ${precoComDesconto.toFixed(2)} | Imposto: ${icms.toFixed(2)}% | Total: R$ ${precoFinal.toFixed(2)}`;
}


console.log("Produto com Desconto")
console.log(calcularProduto(100.00, true));
console.log()
console.log("Produto sem desconto")
console.log(calcularProduto(100.00, false));