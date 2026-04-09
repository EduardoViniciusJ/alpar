angular.module('app').controller('AccountController', function($scope, AuthService, $window) {
    const ROUTES = {
        LOGIN: 'index.html',
        DASHBOARD: 'daily-record.html'
    };

    $scope.auth = {
        mode: 'login',
        login: { email: '', password: '' },
        register: { username: '', email: '', password: '' },
        reset: { email: '', newPassword: '' },
        feedback: { success: true, message: '' }
    };

    $scope.account = {
        isAuthenticated: false,
        user: null
    };

    function refreshSession() {
        $scope.account.user = AuthService.getCurrentUser();
        $scope.account.isAuthenticated = AuthService.isAuthenticated();
    }

    function setFeedback(success, message) {
        $scope.auth.feedback.success = success;
        $scope.auth.feedback.message = message;
    }

    $scope.resetForms = function() {
        $scope.auth.login = { email: '', password: '' };
        $scope.auth.register = { username: '', email: '', password: '' };
        $scope.auth.reset = { email: '', newPassword: '' };
    };

    $scope.goTo = function(page) {
        $window.location.href = ROUTES[page];
    };

    $scope.setAuthMode = function(mode) {
        $scope.auth.mode = mode;
        $scope.auth.feedback.message = '';
    };

    $scope.register = function() {
        try {
            AuthService.register($scope.auth.register);
            setFeedback(true, 'Conta criada com sucesso. Faça login para continuar.');
            $scope.auth.mode = 'login';
            $scope.resetForms();
        } catch (error) {
            setFeedback(false, error.message);
        }
    };

    $scope.login = function() {
        try {
            AuthService.login($scope.auth.login.email, $scope.auth.login.password);
            $scope.resetForms();
            $scope.auth.feedback.message = '';
            refreshSession();
            $scope.goTo('DASHBOARD');
        } catch (error) {
            setFeedback(false, error.message);
        }
    };

    $scope.resetPassword = function() {
        try {
            AuthService.resetPassword($scope.auth.reset.email, $scope.auth.reset.newPassword);
            setFeedback(true, 'Senha redefinida com sucesso. Agora você já pode entrar.');
            $scope.auth.mode = 'login';
            $scope.resetForms();
        } catch (error) {
            setFeedback(false, error.message);
        }
    };

    $scope.logout = function() {
        AuthService.logout();
        refreshSession();
        $scope.auth.mode = 'login';
        $scope.goTo('LOGIN');
    };

    refreshSession();

    $scope.redirectAuthenticatedUsers = function() {
        const path = String($window.location.pathname || '').toLowerCase();
        if ((path.indexOf('index.html') !== -1 || path === '/' || path === '') && AuthService.isAuthenticated()) {
            $window.location.replace(ROUTES.DASHBOARD);
        }
    };

    $scope.redirectAuthenticatedUsers();
});
