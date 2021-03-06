(function () {
    'use strict';

    angular.module('app').controller('mvSignupCtrl', ['$scope', 'mvUser', 'mvNotifier', '$location', 'mvAuth',
        function ($scope, mvUser, mvNotifier, $location, mvAuth) {
            $scope.userNameAvailable = true;

            $scope.checkUniqueness = function () {

                mvAuth.checkUniqueness($scope.signupForm.email.$viewValue).then(function (success) {
                    $scope.userNameAvailable = success;
                });
            }

            $scope.signup = function () {
                var newUserData = {
                    userName: $scope.email,
                    password: $scope.password,
                    firstName: $scope.fname,
                    lastName: $scope.lname,
                };

                mvAuth.createUser(newUserData).then(function () {
                    mvNotifier.notify('user account created!');
                    $location.path('/');
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            }
        }]);
})();