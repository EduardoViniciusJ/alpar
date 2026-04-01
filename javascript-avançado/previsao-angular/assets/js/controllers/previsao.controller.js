angular.module('app').controller('PrevisaoController', function($scope, PrevisaoService) {
    $scope.cidade = 'Curitiba';
    $scope.temperatura = null;
    $scope.nomeCidade = '';
    $scope.erro = '';
    $scope.carregando = false;

    $scope.buscarClima = function() {
        if (!$scope.cidade || !$scope.cidade.trim()) {
            return;
        }

        $scope.carregando = true;
        $scope.erro = '';

        PrevisaoService.buscarPorCidade($scope.cidade.trim())
            .then(function(response) {
                $scope.nomeCidade = response.data.name;
                $scope.temperatura = response.data.main.temp;
            })
            .catch(function() {
                $scope.temperatura = null;
                $scope.nomeCidade = '';
                $scope.erro = 'Nao foi possivel localizar a cidade informada.';
            })
            .finally(function() {
                $scope.carregando = false;
            });
    };

    $scope.buscarClima();
});
