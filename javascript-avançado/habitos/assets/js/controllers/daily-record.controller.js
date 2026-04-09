angular.module('app').controller('DailyRecordController', function($scope, $timeout, HabitService, DailyRecordService, MoodService) {
    $scope.todayRecord = null;
    $scope.recordView = null;
    $scope.note = '';
    $scope.moodLevel = null;
    $scope.moodOptions = MoodService.getMoodOptions();
    $scope.dailyHabits = [];
    $scope.toast = {
        visible: false,
        type: 'success',
        message: ''
    };

    let toastTimer = null;

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
        return MoodService.getMoodLabel(moodLevel);
    };

    $scope.getMoodEmoji = function(moodLevel) {
        return MoodService.getMoodEmoji(moodLevel);
    };

    $scope.selectMood = function(moodLevel) {
        $scope.moodLevel = moodLevel;
    };

    $scope.saveMoment = function() {
        const savedRecord = DailyRecordService.saveToday({
            moodLevel: $scope.moodLevel,
            note: String($scope.note || '').trim(),
            habits: buildTodayHabits()
        });

        applyTodayRecord(savedRecord);
        $scope.showToast('Registro salvo com sucesso', 'success');
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
