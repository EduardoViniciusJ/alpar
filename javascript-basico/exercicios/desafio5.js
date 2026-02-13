const prompt = require("prompt-sync")();

class Pessoa {
    constructor(nome, idade, email) {
        this.nome = nome;
        this.idade = idade;
        this.email = email;
    }
}

const gerenciador = [];

const mostrar = function() {
    console.log();
    console.log("--- Gerenciador de Pessoas ---");
    console.log("1 - Adicionar um novo usuário");
    console.log("2 - Remover um usuário pelo e-mail");
    console.log("3 - Listar todos os usuários cadastrados");
    console.log("4 - Sair do programa");
    console.log();
}

function adicionarPessoa() {
    const nome = prompt("Digite o nome: ");
    const idade = parseInt(prompt("Digite a idade: "));
    const email = prompt("Digite o e-mail: ");

    if (isNaN(idade) || idade <= 0) {
        console.log();
        console.log("Digite apenas idades em números maiores que zero.");
        return;
    }

    if (!nome) {
        console.log();
        console.log("O campo nome não pode ser vazio.");
        return;
    }

    if (!email) {
        console.log();
        console.log("O campo e-mail não pode ser vazio.");
        return;
    }

    const procurarUsuario = gerenciador.find(g => g.email === email);

    if (procurarUsuario) {
        console.log();
        console.log(`Já existe um usuário cadastrado com este e-mail: ${email}`);
        return;
    }

    const pessoa = new Pessoa(nome, idade, email);
    gerenciador.push(pessoa);
    console.log();
    console.log("Usuário adicionado com sucesso!");
    console.log(`Nome: ${pessoa.nome} Idade: ${pessoa.idade} Email: ${pessoa.email}`)
}

function removerPessoa() {
    const email = prompt("Digite o e-mail da pessoa para remover: ");
    const index = gerenciador.findIndex(g => g.email === email);

    if (index !== -1) {
        gerenciador.splice(index, 1);
        console.log();
        console.log("Usuário removido com sucesso!")
    } else {
        console.log();
        console.log("Usuário não encontrado!");
    }
}

function listarPessoas() {
    if (gerenciador.length === 0) {
        console.log();
        console.log("Nenhum registro encontrado.");
        return;
    }

    gerenciador.forEach((p, i) => {
        console.log();
        console.log(`${i + 1} - Nome: ${p.nome}, Idade: ${p.idade}, E-mail: ${p.email}`);
    });
}

let escolhas = "";
while (escolhas !== "4") {
    mostrar();
    escolhas = prompt("Digite uma opção: ");

    switch (escolhas) {
        case "1":
            adicionarPessoa();
            break;
        case "2":
            removerPessoa();
            break;
        case "3":
            listarPessoas();
            break;
        case "4":
            console.log("Saindo do sistema...");
            break;
        default:
            console.log("Opção inválida, tente novamente.");
            break;
    }
}
