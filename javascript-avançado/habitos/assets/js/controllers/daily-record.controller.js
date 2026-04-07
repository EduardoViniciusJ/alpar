angular.module('app').controller('DailyRecordController', function($scope, HabitService, DailyRecordService) {
    $scope.todayRecord = null;
    $scope.note = '';
    $scope.moodLevel = null;
    $scope.dailyHabits = [];

    $scope.errorMessage = '';
    $scope.successMessage = '';

    $scope.moodOptions = [
        { value: 1, label: 'Muito triste' },
        { value: 2, label: 'Neutro' },
        { value: 3, label: 'Feliz' },
        { value: 4, label: 'Muito feliz' }
    ];

    function clearMessages() {
        $scope.errorMessage = '';
        $scope.successMessage = '';
    }

    function refreshTodayRecord() {
        $scope.todayRecord = DailyRecordService.getToday();

        if (!$scope.todayRecord) {
            $scope.todayRecord = DailyRecordService.saveToday({});
        }

        $scope.note = $scope.todayRecord.note;
        $scope.moodLevel = $scope.todayRecord.moodLevel;
        $scope.dailyHabits = $scope.todayRecord.habits;
    }

    $scope.loadTodayHabits = function() {
        clearMessages();

        try {
            const activeHabits = HabitService.getAll().filter(function(habit) {
                return habit.active;
            });

            const currentHabits = $scope.todayRecord ? $scope.todayRecord.habits : [];

            const habitsToSave = activeHabits.map(function(habit) {
                const existingHabit = currentHabits.find(function(item) {
                    return item.id === habit.id;
                });

                return {
                    id: habit.id,
                    name: habit.name,
                    completed: existingHabit ? existingHabit.completed : false
                };
            });

            DailyRecordService.saveToday({ habits: habitsToSave });
            refreshTodayRecord();

            $scope.successMessage = 'Today habits loaded successfully';
        } catch (error) {
            $scope.errorMessage = error.message;
        }
    };

    $scope.selectMood = function(moodLevel) {
        clearMessages();

        try {
            DailyRecordService.saveToday({ moodLevel: moodLevel });
            refreshTodayRecord();

            $scope.successMessage = 'Mood updated successfully';
        } catch (error) {
            $scope.errorMessage = error.message;
        }
    };

    $scope.saveNote = function() {
        clearMessages();

        try {
            DailyRecordService.saveToday({ note: $scope.note });
            refreshTodayRecord();

            $scope.successMessage = 'Note updated successfully';
        } catch (error) {
            $scope.errorMessage = error.message;
        }
    };

    $scope.toggleHabit = function(habitId) {
        clearMessages();

        try {
            DailyRecordService.toggleHabit(habitId);
            refreshTodayRecord();

            $scope.successMessage = 'Daily habit updated successfully';
        } catch (error) {
            $scope.errorMessage = error.message;
        }
    };

    refreshTodayRecord();
});
