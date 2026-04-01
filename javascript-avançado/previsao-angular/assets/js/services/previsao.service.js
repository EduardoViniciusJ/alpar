angular.module('app', []).service('PrevisaoService', function($http) {
    const apiKey = '1af906ace8247e5b346531d64342edf8';
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

    this.buscarPorCidade = function(cidade) {
        return $http.get(baseUrl, {
            params: {
                q: cidade,
                appid: apiKey,
                units: 'metric',
                lang: 'pt_br'
            }
        });
    };
});
