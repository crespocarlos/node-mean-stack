(function () {
    'use strict';

    angular.module('app').controller('mvUserListCtrl', ['$scope', 'mvUser',
        function ($scope, mvUser) {
            $scope.users = mvUser.query();
        }
    ]);
})();