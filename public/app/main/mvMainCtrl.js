(function () {
    'use strict';

    angular.module('app').controller('mvMainCtrl', ['$scope', 'mvCachedCourses',
        function ($scope, mvCachedCourses) {
            $scope.courses = mvCachedCourses.query();
        }]);
})();