angular.module('app').controller('HabitController', function($scope, HabitService) {
    $scope.newHabitName = '';
    $scope.editingHabitId = null;
    $scope.editingHabitName = '';
    $scope.habits = HabitService.getAll();

    $scope.errorMessage = '';
    $scope.successMessage = '';

    function clearMessages() {
        $scope.errorMessage = '';
        $scope.successMessage = '';
    }

    function refreshHabits() {
        $scope.habits = HabitService.getAll();
    }

    function resetEditing() {
        $scope.editingHabitId = null;
        $scope.editingHabitName = '';
    }

    $scope.createHabit = function() {
        clearMessages();

        try {
            HabitService.create($scope.newHabitName);
            $scope.newHabitName = '';
            refreshHabits();
            $scope.successMessage = 'Habit created successfully';
        } catch (error) {
            $scope.errorMessage = error.message;
        }
    };

    $scope.startEditHabit = function(habit) {
        clearMessages();
        $scope.editingHabitId = habit.id;
        $scope.editingHabitName = habit.name;
    };

    $scope.cancelEditHabit = function() {
        clearMessages();
        resetEditing();
    };

    $scope.saveEditHabit = function() {
        clearMessages();

        try {
            HabitService.rename($scope.editingHabitId, $scope.editingHabitName);
            refreshHabits();
            resetEditing();
            $scope.successMessage = 'Habit updated successfully';
        } catch (error) {
            $scope.errorMessage = error.message;
        }
    };

    $scope.toggleHabitStatus = function(habitId) {
        clearMessages();

        try {
            HabitService.toggleStatus(habitId);
            refreshHabits();
            $scope.successMessage = 'Habit status updated successfully';
        } catch (error) {
            $scope.errorMessage = error.message;
        }
    };

    $scope.removeHabit = function(habitId) {
        clearMessages();

        try {
            HabitService.remove(habitId);
            refreshHabits();

            if ($scope.editingHabitId === habitId) {
                resetEditing();
            }

            $scope.successMessage = 'Habit removed successfully';
        } catch (error) {
            $scope.errorMessage = error.message;
        }
    };
});
