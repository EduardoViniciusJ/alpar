angular.module('app').service('StatisticsService', function(DailyRecordService) {
    const cachedRecords = [];

    function loadRecords() {
        const data = DailyRecordService.getAll();
        cachedRecords.length = 0;
        Array.prototype.push.apply(cachedRecords, data);
        return cachedRecords;
    }

    function normalizeNumber(value) {
        const num = Number(value);
        return Number.isFinite(num) ? num : 0;
    }

    function countCompletedHabits(habits) {
        if (!Array.isArray(habits)) {
            return 0;
        }

        return habits.filter(function(habit) {
            return habit && !!habit.completed;
        }).length;
    }

    this.getGeneralMood = function() {
        const validRecords = cachedRecords.filter(function(record) {
                return Number.isFinite(Number(record.moodLevel));
            });

        if (validRecords.length === 0) {
            return 0;
        }

        const totalMood = validRecords.reduce(function(sum, record) {
            return sum + normalizeNumber(record.moodLevel);
        }, 0);

        return totalMood / validRecords.length;
    };

    this.getHabitCompletionRate = function() {
        const validRecords = cachedRecords;

        const totalHabits = validRecords.reduce(function(sum, record) {
            return sum + (Array.isArray(record.habits) ? record.habits.length : 0);
        }, 0);

        if (totalHabits === 0) {
            return 0;
        }

        const completedHabits = validRecords.reduce(function(sum, record) {
            return sum + countCompletedHabits(record.habits);
        }, 0);

        return (completedHabits / totalHabits) * 100;
    };

    this.getBestDay = function() {
        const validRecords = cachedRecords;

        if (validRecords.length === 0) {
            return null;
        }

        const bestRecord = validRecords.reduce(function(best, current) {
            const currentCompleted = countCompletedHabits(current.habits);
            const bestCompleted = countCompletedHabits(best.habits);
            return currentCompleted > bestCompleted ? current : best;
        });

        return bestRecord ? bestRecord.date : null;
    };

    this.getEvolutionData = function() {
        return cachedRecords.slice()
            .sort(function(a, b) {
                return String(a.date).localeCompare(String(b.date));
            })
            .map(function(record) {
                const totalHabits = Array.isArray(record.habits) ? record.habits.length : 0;
                const completedHabits = countCompletedHabits(record.habits);
                const completion = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;

                return {
                    date: record.date,
                    mood: normalizeNumber(record.moodLevel),
                    completion: completion
                };
            });
    };

    this.refreshCache = function() {
        return loadRecords();
    };

    loadRecords();
});
