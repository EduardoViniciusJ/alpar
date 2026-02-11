const numeroRandomizado = Math.floor(Math.random() * 100) + 1; 

let tentativas = 0;
let escolha;

while (escolha !== numeroRandomizado) {

    escolha = parseInt(prompt("Escolha um número de 1 a 100:"));
    tentativas++;

    if (escolha > numeroRandomizado) {
        alert(`O número escolhido (${escolha}) é maior que o número randomizado.`);
    } else if (escolha < numeroRandomizado) {
        alert(`O número escolhido (${escolha}) é menor que o número randomizado.`);
    } else {
        alert(`Parabéns você acertou o número ${numeroRandomizado} em ${tentativas} tentativas.`);
    }
}
