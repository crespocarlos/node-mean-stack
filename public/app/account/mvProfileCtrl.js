(function () {
    'use strict';

    angular.module('app').controller('mvProfileCtrl', ['$scope', 'mvNotifier', 'mvIdentity', 'mvAuth',
        function ($scope, mvNotifier, mvIdentity, mvAuth) {
            $scope.email = mvIdentity.currentUser.userName;
            $scope.fname = mvIdentity.currentUser.firstName;
            $scope.lname = mvIdentity.currentUser.lastName;

            $scope.update = function () {
                var newUserData = {
                    firstName: $scope.fname,
                    lastName: $scope.lname
                };

                if ($scope.password && $scope.password.length > 0) {
                    newUserData.password = $scope.password;
                }

                mvAuth.updateCurrentUser(newUserData).then(function () {
                    mvNotifier.notify('Your user account has been updated.');
                }, function (reason) {
                    mvNotifier.error(reason);
                })
            }
        }
    ]);
})();