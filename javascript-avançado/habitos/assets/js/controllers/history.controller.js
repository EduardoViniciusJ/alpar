angular.module('app').controller('HistoryController', function($scope, DailyRecordService, MoodService) {
    const FEEDBACK_TYPES = {
        SUCCESS: 'success',
        DANGER: 'danger'
    };

    $scope.records = [];
    $scope.filteredRecords = [];
    $scope.editingDate = null;
    $scope.editForm = {
        moodLevel: '',
        note: ''
    };
    $scope.moodOptions = MoodService.getMoodOptions();
    $scope.filters = {
        date: '',
        moodLevel: ''
    };
    $scope.feedback = {
        type: FEEDBACK_TYPES.SUCCESS,
        message: ''
    };

    function setFeedback(type, message) {
        $scope.feedback.type = type;
        $scope.feedback.message = message;
    }

    function clearFeedback() {
        $scope.feedback.message = '';
    }

    function validateEditForm() {
        return $scope.editForm.moodLevel !== '' || $scope.editForm.note.trim() !== '';
    }

    $scope.getMoodLabel = function(moodLevel) {
        return MoodService.getMoodLabel(moodLevel);
    };

    $scope.getMoodEmoji = function(moodLevel) {
        return MoodService.getMoodEmoji(moodLevel);
    };

    $scope.getHabitSummary = function(habits) {
        if (!Array.isArray(habits) || habits.length === 0) {
            return 'Sem hábitos';
        }

        const completed = habits.filter(function(habit) {
            return habit.completed;
        });
        const completedNames = completed.map(function(habit) {
            return habit.name;
        });

        if (completed.length === 0) {
            return 'Nenhum concluído';
        }

        return completedNames.join(', ');
    };

    function applyFilters() {
        let filterDate = $scope.filters.date;
        if (filterDate instanceof Date) {
            filterDate = filterDate.toISOString().split('T')[0];
        } else {
            filterDate = String(filterDate || '').trim();
        }

        const hasMoodFilter = $scope.filters.moodLevel !== '' && $scope.filters.moodLevel !== null;
        const filterMoodLevel = hasMoodFilter ? Number($scope.filters.moodLevel) : null;

        $scope.filteredRecords = $scope.records.filter(function(record) {
            const matchesDate = !filterDate || record.date === filterDate;
            const matchesMood = !hasMoodFilter || record.moodLevel === filterMoodLevel;
            return matchesDate && matchesMood;
        });
    }

    $scope.applyFilters = applyFilters;

    function loadRecords() {
        $scope.records = DailyRecordService.getAll().slice().reverse();
        applyFilters();
    }

    $scope.resetFilters = function() {
        $scope.filters.date = '';
        $scope.filters.moodLevel = '';
        loadRecords();
    };

    $scope.startEdit = function(record) {
        $scope.editingDate = record.date;
        $scope.editForm.moodLevel = (record.moodLevel !== null && record.moodLevel !== undefined) ? record.moodLevel.toString() : '';
        $scope.editForm.note = record.note || '';
        clearFeedback();
    };

    $scope.cancelEdit = function() {
        $scope.editingDate = null;
        $scope.editForm.moodLevel = '';
        $scope.editForm.note = '';
    };

    $scope.saveEdit = function(date) {
        try {
            if (!validateEditForm()) {
                setFeedback(FEEDBACK_TYPES.DANGER, 'Preencha pelo menos o humor ou a observação.');
                return;
            }

            DailyRecordService.updateByDate(date, {
                moodLevel: $scope.editForm.moodLevel === '' ? null : Number($scope.editForm.moodLevel),
                note: $scope.editForm.note.trim()
            });

            $scope.cancelEdit();
            loadRecords();
            setFeedback(FEEDBACK_TYPES.SUCCESS, 'Registro atualizado com sucesso.');
        } catch (error) {
            setFeedback(FEEDBACK_TYPES.DANGER, error.message);
        }
    };

    $scope.removeRecord = function(date) {
        try {
            DailyRecordService.removeByDate(date);
            if ($scope.editingDate === date) {
                $scope.cancelEdit();
            }
            loadRecords();
            setFeedback(FEEDBACK_TYPES.SUCCESS, 'Registro removido com sucesso.');
        } catch (error) {
            setFeedback(FEEDBACK_TYPES.DANGER, error.message);
        }
    };

    loadRecords();
});
