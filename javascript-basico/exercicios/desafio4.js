const prompt = require("prompt-sync")();

const nome = prompt("Digite seu nome: ");
console.log()
console.log(`Olá, ${nome}!`); 

const listaDeCompras = [];

const mostrarMenu = function(){
    console.log()
    console.log("--- Gerenciador de Compras ---");
    console.log("1 - Adicionar Item");
    console.log("2 - Remover Item");
    console.log("3 - Exibir Itens");
    console.log("4 - Sair");
    console.log();
};

let escolhas = "";

while(escolhas !== "4"){
    mostrarMenu();
    escolhas = prompt("Digite uma opção: ");

    switch(escolhas){
        case "1":
            let itemAdicionar = prompt("Digite o nome do item: ");
            listaDeCompras.push(itemAdicionar);
            console.log()
            console.log(`Item "${itemAdicionar}" adicionado com sucesso!`);
            break;

        case "2": 
            let itemRemover = prompt("Digite o nome do item para remover: ");
            let index = listaDeCompras.indexOf(itemRemover);

            if(index !== -1){
                listaDeCompras.splice(index, 1);
                console.log()
                console.log(`Item "${itemRemover}" removido com sucesso!`);
            } else {
                console.log()
                console.log(`O item "${itemRemover}" não foi encontrado no gerenciador de compras.`);
            }
            break;

        case "3":
            if(listaDeCompras.length === 0){
                console.log()
                console.log("Não existe nenhum item no gerenciador de compras.");
            } else {
                console.log()
                listaDeCompras.forEach((item, i) => {
                    console.log(`${i + 1}. ${item}`);
                });
            }
            break;

        case "4":
            console.log("Saindo do sistema");
            break;

        default:
            console.log("Opção inválida, tente novamente.");
            break;
    }
}