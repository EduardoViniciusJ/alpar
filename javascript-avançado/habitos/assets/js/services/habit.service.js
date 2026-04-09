angular.module('app').service('HabitService', function() {
    const habits = [];
    const HABITS_STORAGE_KEY = 'todoflow.habits';

    function saveToStorage() {
        const serializedHabits = habits.map(function(habit) {
            return {
                id: habit.id,
                name: habit.name,
                active: habit.active,
                createdAt: habit.createdAt
            };
        });

        localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(serializedHabits));
    }

    function loadFromStorage() {
        const rawData = localStorage.getItem(HABITS_STORAGE_KEY);

        if (!rawData) {
            return;
        }

        try {
            const parsedData = JSON.parse(rawData);

            if (!Array.isArray(parsedData)) {
                return;
            }

            parsedData.forEach(function(item) {
                const habit = new Habit();
                habit.id = item.id;
                habit.name = item.name;
                habit.active = item.active;
                habit.createdAt = item.createdAt;
                habits.push(habit);
            });
        } catch (error) {
            localStorage.removeItem(HABITS_STORAGE_KEY);
        }
    }

    function normalizeName(name) {
        return String(name || '').trim().toLowerCase();
    }

    function findHabit(id) {
        return habits.find(function(habit) {
            return habit.id === Number(id);
        });
    }

    function findHabitById(id) {
        return findHabit(id) || null;
    }

    function findHabitIndexById(id) {
        const habit = findHabit(id);
        return habit ? habits.indexOf(habit) : -1;
    }

    function habitNameAlreadyExists(name, ignoreId = null) {
        const normalizedName = normalizeName(name);

        return habits.some(function(habit) {
            if (ignoreId !== null && habit.id === ignoreId) {
                return false;
            }

            return normalizeName(habit.name) === normalizedName;
        });
    }

    this.getAll = function() {
        return habits.slice();
    };

    this.getById = function(id) {
        return findHabitById(id);
    };

    this.create = function(name) {
        if (habitNameAlreadyExists(name)) {
            throw new Error('Hábito já existe');
        }

        const habit = new Habit();
        habit.name = name;
        habit.active = true;

        habits.push(habit);
        saveToStorage();

        return habit;
    };

    this.remove = function(id) {
        const habitIndex = findHabitIndexById(id);

        if (habitIndex === -1) {
            throw new Error('Hábito não encontrado');
        }

        habits.splice(habitIndex, 1);
        saveToStorage();
    };

    this.rename = function(id, newName) {
        const habit = findHabitById(id);

        if (!habit) {
            throw new Error('Hábito não encontrado');
        }

        if (habitNameAlreadyExists(newName, habit.id)) {
            throw new Error('Hábito já existe');
        }

        habit.name = newName;
        saveToStorage();
        return habit;
    };

    this.activate = function(id) {
        const habit = findHabitById(id);

        if (!habit) {
            throw new Error('Hábito não encontrado');
        }

        habit.active = true;
        saveToStorage();

        return habit;
    };

    this.deactivate = function(id) {
        const habit = findHabitById(id);

        if (!habit) {
            throw new Error('Hábito não encontrado');
        }

        habit.active = false;
        saveToStorage();

        return habit;
    };

    this.toggleStatus = function(id) {
        const habit = findHabitById(id);

        if (!habit) {
            throw new Error('Hábito não encontrado');
        }

        habit.active = !habit.active;
        saveToStorage();

        return habit;
    };

    loadFromStorage();
});
