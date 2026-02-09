const pessoa = {}

pessoa.nome = "eduardo"
pessoa.email = "eduardovinicius@gmail"
pessoa.andar = function() {
    console.log(`${this.nome} a pessoa está andando`)
};
pessoa.andar()


const carro = {
    modelo: "Agro",
    marca: "Fiat",
    portas: 4,
}

console.log(carro)