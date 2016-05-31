(function () {
    'use strict';

    angular.module('app').controller('mvNavBarLoginCtrl', ['$scope', '$http', 'mvIdentity', 'mvNotifier', 'mvAuth', '$location',
        function ($scope, $http, mvIdentity, mvNotifier, mvAuth, $location) {
            $scope.identity = mvIdentity;

            $scope.signin = function (username, password) {
                mvAuth.authenticateUser(username, password).then(function (success) {
                    if (success) {
                        mvNotifier.notify('Logged in!');
                    } else {
                        mvNotifier.error('Wrong username or passord');
                    }
                });
            }

            $scope.signout = function () {
                mvAuth.logoutUser().then(function () {
                    $scope.username = "";
                    $scope.password = "";
                    mvNotifier.notify('Come back soon =/');
                    $location.path('/');
                });
            }
        }]);
})();