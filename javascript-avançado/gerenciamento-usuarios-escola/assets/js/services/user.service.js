angular.module('app', []).service('UsuarioService', function() {

    const usuarios = [
        { nome: 'Eduardo Vinicius', tipo: 'Aluno', dataCadastro: new Date(2026, 2, 15) },
        { nome: 'Ana Costa', tipo: 'Professor', dataCadastro: new Date(2026, 1, 10) },
        { nome: 'Carlos Silva', tipo: 'Aluno', dataCadastro: new Date(2026, 2, 20) },
        { nome: 'Marta Souza', tipo: 'Professor', dataCadastro: new Date(2025, 11, 5) },
        { nome: 'Joao Pedro', tipo: 'Aluno', dataCadastro: new Date() }
    ];

    this.listar = function() {
        return usuarios;
    };

    this.adicionar = function(usuario) {
        usuarios.push(usuario);
    };

    this.remover = function(index) {
        usuarios.splice(index, 1);
    };
});
