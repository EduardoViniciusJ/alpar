angular.module('app').service('DailyRecordService', function(AuthService) {
    const dailyRecords = [];
    const BASE_STORAGE_KEY = 'todoflow.dailyRecords';

    function getStorageKey() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser || !currentUser.email) {
            return BASE_STORAGE_KEY;
        }
        return BASE_STORAGE_KEY + '.' + currentUser.email;
    }

    function getTodayDate() {
        return new Date().toISOString().split('T')[0];
    }

    function createRecord(date, moodLevel, note, habits) {
        const record = new DailyRecord();
        record.date = date;
        record.moodLevel = moodLevel;
        record.note = note;
        record.habits = habits;
        return record;
    }

    function saveToStorage() {
        const serializedRecords = dailyRecords.map(function(record) {
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
        });

        localStorage.setItem(getStorageKey(), JSON.stringify(serializedRecords));
    }

    function loadFromStorage() {
        const rawData = localStorage.getItem(getStorageKey());

        if (!rawData) {
            return false;
        }

        try {
            const parsedData = JSON.parse(rawData);

            if (!Array.isArray(parsedData)) {
                return false;
            }

            parsedData.forEach(function(item) {
                dailyRecords.push(createRecord(
                    item.date,
                    item.moodLevel,
                    item.note,
                    Array.isArray(item.habits) ? item.habits : []
                ));
            });

            return true;
        } catch (error) {
            localStorage.removeItem(getStorageKey());
            return false;
        }
    }

    function getOrCreateTodayRecord() {
        let dailyRecord = dailyRecords.find(function(record) {
            return record.date === getTodayDate();
        });

        if (!dailyRecord) {
            dailyRecord = new DailyRecord();
            dailyRecords.push(dailyRecord);
            saveToStorage();
        }

        return dailyRecord;
    }

    this.getAll = function() {
        return dailyRecords;
    };

    this.getToday = function() {
        return dailyRecords.find(function(record) {
            return record.date === getTodayDate();
        }) || null;
    };

    this.getByDate = function(date) {
        const normalizedDate = String(date || '').trim();

        if (!normalizedDate) {
            return null;
        }

        return dailyRecords.find(function(record) {
            return record.date === normalizedDate;
        }) || null;
    };

    this.saveToday = function(data = {}) {
        const dailyRecord = getOrCreateTodayRecord();

        if (typeof data.moodLevel !== 'undefined') {
            dailyRecord.moodLevel = data.moodLevel;
        }

        if (typeof data.note !== 'undefined') {
            dailyRecord.note = data.note;
        }

        if (Array.isArray(data.habits)) {
            dailyRecord.habits = data.habits.map(function(habit) {
                return {
                    id: habit.id,
                    name: habit.name,
                    completed: typeof habit.completed === 'boolean' ? habit.completed : false
                };
            });
        }

        saveToStorage();
        return dailyRecord;
    };

    this.toggleHabit = function(habitId) {
        const dailyRecord = getOrCreateTodayRecord();

        const habit = dailyRecord.habits.find(function(item) {
            return item.id === Number(habitId);
        });

        if (!habit) {
            throw new Error('Hábito não encontrado');
        }

        habit.completed = !habit.completed;

        saveToStorage();
        return dailyRecord;
    };

    this.updateByDate = function(date, data = {}) {
        const dailyRecord = this.getByDate(date);

        if (!dailyRecord) {
            throw new Error('Registro não encontrado');
        }

        if (typeof data.moodLevel !== 'undefined') {
            dailyRecord.moodLevel = data.moodLevel;
        }

        if (typeof data.note !== 'undefined') {
            dailyRecord.note = data.note;
        }

        if (Array.isArray(data.habits)) {
            dailyRecord.habits = data.habits.map(function(habit) {
                return {
                    id: habit.id,
                    name: habit.name,
                    completed: typeof habit.completed === 'boolean' ? habit.completed : false
                };
            });
        }

        saveToStorage();
        return dailyRecord;
    };

    this.removeByDate = function(date) {
        const normalizedDate = String(date || '').trim();
        const recordIndex = dailyRecords.findIndex(function(record) {
            return record.date === normalizedDate;
        });

        if (recordIndex === -1) {
            throw new Error('Registro não encontrado');
        }

        dailyRecords.splice(recordIndex, 1);
        saveToStorage();
    };

    loadFromStorage();
});
