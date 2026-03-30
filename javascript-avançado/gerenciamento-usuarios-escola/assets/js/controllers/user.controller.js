angular.module('app').controller('AppController', [
  '$scope', 
  'UsuarioService', 
  function($scope, UsuarioService) {
    
    $scope.mensagemBoasVindas = 'Bem-vindo ao sistema de gerenciamento de usuários da escola!';
    $scope.usuarios = UsuarioService.listar();
    
    $scope.novoUsuario = {
        nome: '',
        tipo: 'Aluno'
    };

    // adicionar usuário
    $scope.adicionarUsuario = function() {
        if (!$scope.novoUsuario.nome || !$scope.novoUsuario.nome.trim()) {
            return;
        }

        UsuarioService.adicionar({
            nome: $scope.novoUsuario.nome.trim(),
            tipo: $scope.novoUsuario.tipo,
            dataCadastro: new Date()
        });

        // reseta o formulário
        $scope.novoUsuario = {
            nome: '',
            tipo: 'Aluno'
        };
    };

    // remover usuário
    $scope.removerUsuario = function(index) {
        UsuarioService.remover(index);
    };
  }
]);