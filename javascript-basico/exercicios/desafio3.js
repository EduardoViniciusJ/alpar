const prompt = require("prompt-sync")();
const numeroRandomizado = Math.floor(Math.random() * 100) + 1; 

let tentativas = 0;
let escolha;

while (escolha !== numeroRandomizado) {

    escolha = parseInt(prompt("Escolha um número de 1 a 100: "));
    tentativas++;

    if (numeroRandomizado < escolha) {
        console.log(`O número randomizado é menor que sua escolha: ${escolha}`);
    } else if (numeroRandomizado > escolha) {
        console.log(`O número randomizado é maior que sua escolha: ${escolha}`);
    } else {
        console.log(`Parabéns você acertou o número randomizado ${numeroRandomizado} em ${tentativas} tentativas.`);
    }
}
