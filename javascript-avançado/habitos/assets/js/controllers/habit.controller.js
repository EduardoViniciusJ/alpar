angular.module('app').controller('HabitController', function($scope, HabitService, DailyRecordService) {
    $scope.newHabitName = '';
    $scope.editingHabitId = null;
    $scope.editingHabitName = '';
    $scope.habits = HabitService.getAll();
    $scope.feedback = {
        visible: false,
        type: 'success',
        message: ''
    };

    let feedbackTimer = null;

    function refreshHabits() {
        $scope.habits = HabitService.getAll();
    }

    function resetEditing() {
        $scope.editingHabitId = null;
        $scope.editingHabitName = '';
    }

    function showFeedback(message, type) {
        $scope.feedback.message = message;
        $scope.feedback.type = type || 'success';
        $scope.feedback.visible = true;

        if (feedbackTimer) {
            clearTimeout(feedbackTimer);
        }

        feedbackTimer = setTimeout(function() {
            $scope.feedback.visible = false;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, 3000);
    }

    function closeAddHabitModal() {
        const modalElement = document.getElementById('addHabitModal');

        if (!modalElement || !window.bootstrap) {
            return;
        }

        const modal = window.bootstrap.Modal.getInstance(modalElement);

        if (modal) {
            modal.hide();
        }
    }

    function getDailyHabitById(habitId) {
        const todayRecord = DailyRecordService.getToday();
        if (!todayRecord || !Array.isArray(todayRecord.habits)) {
            return null;
        }

        return todayRecord.habits.find(function(habit) {
            return habit.id === Number(habitId);
        }) || null;
    }

    $scope.isHabitCompletedToday = function(habitId) {
        const dailyHabit = getDailyHabitById(habitId);
        return dailyHabit ? dailyHabit.completed : false;
    };

    $scope.toggleDailyHabitFromCard = function(habitId) {
        try {
            DailyRecordService.toggleHabit(habitId);
            refreshHabits();
        } catch (error) {
            showFeedback(error.message, 'danger');
        }
    };

    $scope.createHabit = function() {
        try {
            HabitService.create($scope.newHabitName);
            $scope.newHabitName = '';
            refreshHabits();
            closeAddHabitModal();
            showFeedback('Hábito criado com sucesso', 'success');
        } catch (error) {
            showFeedback(error.message, 'danger');
        }
    };

    $scope.startEditHabit = function(habit) {
        $scope.editingHabitId = habit.id;
        $scope.editingHabitName = habit.name;
    };

    $scope.cancelEditHabit = function() {
        resetEditing();
    };

    $scope.saveEditHabit = function() {
        try {
            const inputElement = document.getElementById('habitEditInput');
            const newName = inputElement ? inputElement.value : $scope.editingHabitName;

            HabitService.rename(Number($scope.editingHabitId), newName);

            refreshHabits();

            resetEditing();

            showFeedback('Hábito atualizado com sucesso', 'success');
        } catch (error) {
            showFeedback(error.message, 'danger');
        }
    };

    $scope.toggleHabitStatus = function(habitId) {
        try {
            HabitService.toggleStatus(habitId);
            refreshHabits();
            showFeedback('Status do hábito atualizado', 'success');
        } catch (error) {
            showFeedback(error.message, 'danger');
        }
    };

    $scope.removeHabit = function(habitId) {
        try {
            HabitService.remove(habitId);
            refreshHabits();

            if ($scope.editingHabitId === habitId) {
                resetEditing();
            }

            showFeedback('Hábito removido com sucesso', 'success');
        } catch (error) {
            showFeedback(error.message, 'danger');
        }
    };
});
