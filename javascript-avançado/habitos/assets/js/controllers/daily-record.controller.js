angular.module('app').controller('DailyRecordController', function($scope, $timeout, HabitService, DailyRecordService) {
    $scope.todayRecord = null;
    $scope.recordView = null;
    $scope.note = '';
    $scope.moodLevel = null;
    $scope.dailyHabits = [];
    $scope.toast = {
        visible: false,
        type: 'success',
        message: ''
    };

    let toastTimer = null;

    $scope.moodOptions = [
        { value: 1, label: 'Muito triste', emoji: '\uD83D\uDE22' },
        { value: 2, label: 'Neutro', emoji: '\uD83D\uDE10' },
        { value: 3, label: 'Feliz', emoji: '\uD83D\uDE42' },
        { value: 4, label: 'Muito feliz', emoji: '\uD83E\uDD29' }
    ];

    function buildTodayHabits() {
        const activeHabits = HabitService.getAll().filter(function(habit) {
            return habit.active;
        });

        const currentHabits = $scope.recordView ? $scope.recordView.habits : [];

        return activeHabits.map(function(habit) {
            const existingHabit = currentHabits.find(function(item) {
                return item.id === habit.id;
            });

            return {
                id: habit.id,
                name: habit.name,
                completed: existingHabit ? existingHabit.completed : false
            };
        });
    }

    function buildRecordView(record) {
        if (!record) {
            return null;
        }

        return {
            date: record.date,
            moodLevel: record.moodLevel,
            note: record.note,
            habits: Array.isArray(record.habits) ? record.habits.map(function(habit) {
                return {
                    id: habit.id,
                    name: habit.name,
                    completed: !!habit.completed
                };
            }) : []
        };
    }

    function applyTodayRecord(record) {
        $scope.todayRecord = record;
        $scope.recordView = buildRecordView(record);
        $scope.note = $scope.recordView ? $scope.recordView.note : '';
        $scope.moodLevel = $scope.recordView ? $scope.recordView.moodLevel : null;
        $scope.dailyHabits = $scope.recordView ? $scope.recordView.habits : [];
    }

    function refreshTodayRecord() {
        applyTodayRecord(DailyRecordService.getToday());
    }

    $scope.showToast = function(message, type) {
        if (toastTimer) {
            $timeout.cancel(toastTimer);
        }

        $scope.toast.message = message;
        $scope.toast.type = type || 'success';
        $scope.toast.visible = true;

        toastTimer = $timeout(function() {
            $scope.toast.visible = false;
        }, 2600);
    };

    $scope.getMoodLabel = function(moodLevel) {
        const mood = $scope.moodOptions.find(function(option) {
            return option.value === moodLevel;
        });

        return mood ? mood.label : 'Nao definido';
    };

    $scope.getMoodEmoji = function(moodLevel) {
        const mood = $scope.moodOptions.find(function(option) {
            return option.value === moodLevel;
        });

        return mood ? mood.emoji : '\uD83D\uDCAD';
    };

    $scope.selectMood = function(moodLevel) {
        $scope.moodLevel = moodLevel;
    };

    $scope.loadTodayHabits = function() {
        try {
            const savedRecord = DailyRecordService.saveToday({
                moodLevel: $scope.moodLevel,
                note: String($scope.note || '').trim(),
                habits: buildTodayHabits()
            });

            applyTodayRecord(savedRecord);
            $scope.showToast('Habitos sincronizados com sucesso', 'success');
        } catch (error) {
            $scope.showToast(error.message, 'danger');
        }
    };

    $scope.saveMoment = function() {
        try {
            const savedRecord = DailyRecordService.saveToday({
                moodLevel: $scope.moodLevel,
                note: String($scope.note || '').trim(),
                habits: buildTodayHabits()
            });

            applyTodayRecord(savedRecord);
            $scope.showToast('Registro salvo com sucesso', 'success');
        } catch (error) {
            $scope.showToast(error.message, 'danger');
        }
    };

    $scope.toggleHabit = function(habitId) {
        try {
            const savedRecord = DailyRecordService.toggleHabit(habitId);
            applyTodayRecord(savedRecord);
        } catch (error) {
            $scope.showToast(error.message, 'danger');
        }
    };

    refreshTodayRecord();
});
