angular.module('app').controller('HistoryController', function($scope, DailyRecordService) {
    $scope.records = [];
    $scope.filteredRecords = [];

    $scope.filters = {
        date: '',
        moodLevel: ''
    };

    function applyFilters() {
        var filterDate = String($scope.filters.date || '').trim();
        var hasMoodFilter = $scope.filters.moodLevel !== '' && $scope.filters.moodLevel !== null;
        var filterMoodLevel = hasMoodFilter ? Number($scope.filters.moodLevel) : null;

        $scope.filteredRecords = $scope.records.filter(function(record) {
            var matchesDate = !filterDate || record.date === filterDate;
            var matchesMood = !hasMoodFilter || record.moodLevel === filterMoodLevel;

            return matchesDate && matchesMood;
        });
    }

    function loadRecords() {
        $scope.records = DailyRecordService.getAll().slice().reverse();
        applyFilters();
    }

    $scope.applyFilters = function() {
        applyFilters();
    };

    $scope.clearFilters = function() {
        $scope.filters.date = '';
        $scope.filters.moodLevel = '';
        applyFilters();
    };

    $scope.refreshHistory = function() {
        loadRecords();
    };

    loadRecords();
});
