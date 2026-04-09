angular.module('app').controller('MetricsController', function($scope, DailyRecordService, StatisticsService, MoodService) {
    const FEEDBACK_TYPES = {
        SUCCESS: 'success',
        DANGER: 'danger'
    };

    $scope.moodOptions = MoodService.getMoodOptions();
    $scope.metrics = {
        averageMood: 0,
        completionRate: 0,
        totalDays: 0,
        bestDay: null
    };
    $scope.evolutionData = [];
    $scope.toast = {
        visible: false,
        type: FEEDBACK_TYPES.SUCCESS,
        message: ''
    };

    let toastTimer = null;

    function setFeedback(type, message) {
        $scope.toast.type = type;
        $scope.toast.message = message;
        $scope.toast.visible = true;

        if (toastTimer) {
            clearTimeout(toastTimer);
        }

        toastTimer = setTimeout(function() {
            $scope.toast.visible = false;
            $scope.$apply();
        }, 3000);
    }

    function loadMetrics(showToast = false) {
        try {
            StatisticsService.refreshCache();
            $scope.metrics.averageMood = StatisticsService.getGeneralMood();
            $scope.metrics.completionRate = StatisticsService.getHabitCompletionRate();
            $scope.metrics.totalDays = DailyRecordService.getAll().length;
            $scope.metrics.bestDay = StatisticsService.getBestDay();
            $scope.evolutionData = StatisticsService.getEvolutionData();

            if (showToast) {
                setFeedback(FEEDBACK_TYPES.SUCCESS, 'Métricas atualizadas com sucesso!');
            }
        } catch (error) {
            setFeedback(FEEDBACK_TYPES.DANGER, 'Erro ao carregar métricas: ' + error.message);
        }
    }

    $scope.getMoodEmoji = function(moodLevel) {
        return MoodService.getMoodEmoji(moodLevel);
    };

    $scope.getMoodLabel = function(moodLevel) {
        return MoodService.getMoodLabel(moodLevel);
    };

    $scope.getMoodCardClass = function() {
        if ($scope.metrics.averageMood > 3) {
            return 'text-bg-success';
        }

        if ($scope.metrics.averageMood < 2 && $scope.metrics.averageMood > 0) {
            return 'text-bg-warning';
        }

        return 'text-bg-dark';
    };

    $scope.getProgressBarClass = function() {
        if ($scope.metrics.completionRate >= 70) {
            return 'bg-success';
        }

        if ($scope.metrics.completionRate >= 40) {
            return 'bg-warning';
        }

        return 'bg-dark';
    };

    $scope.refreshMetrics = function() {
        loadMetrics(true);
    };

    loadMetrics();
});
