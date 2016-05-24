(function () {
    'use strict';

    angular.module('app').controller('mvNavBarLoginCtrl', ['$scope', '$http', 'mvIdentity', 'mvNotifier', 'mvAuth',
        function ($scope, $http, mvIdentity, mvNotifier, mvAuth) {
            $scope.identity = mvIdentity;
            $scope.signin = function (username, password) {
                mvAuth.authenticateUser(username, password).then(function (success) {
                    if (success) {
                        mvNotifier.notify('Logged in!');
                    } else {
                        mvNotifier.notify('Wrong username or passord');
                    }
                });
            }
        }]);
})();