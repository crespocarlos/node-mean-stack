(function () {
    'use strict';

    angular.module('app').factory('mvAuth', ['$http', 'mvIdentity', '$q', 'mvUser',
        function ($http, mvIdentity, $q, mvUser) {
            return {
                authenticateUser: function (username, password) {
                    var dfd = $q.defer();
                    $http.post('/login', { username: username, password: password }).then(function (response) {
                        if (response.data.success) {
                            var user = new mvUser();
                            angular.extend(user, response.data.user);
                            mvIdentity.currentUser = user;
                            dfd.resolve(true);
                        } else {
                            dfd.resolve(false);
                        }
                    });

                    return dfd.promise;
                },
                checkUniqueness: function (username) {
                    var dfd = $q.defer();
                    $http.get('/api/users/checkUniqueness/' + username).then(function (response) {
                        dfd.resolve(response.data);
                    });

                    return dfd.promise;
                },
                createUser: function (newUserData) {
                    var newUser = new mvUser(newUserData),
                        dfd = $q.defer();

                    newUser.$save().then(function () {
                        mvIdentity.currentUser = newUser;
                        dfd.resolve();
                    }, function (response) {
                        dfd.reject(response.data.reason);
                    });

                    return dfd.promise;

                },
                updateCurrentUser: function (newUserData) {
                    var dfd = $q.defer(),
                        clone = angular.copy(mvIdentity.currentUser);

                    angular.extend(clone, newUserData);

                    clone.$update().then(function () {
                        mvIdentity.currentUser = clone;
                        dfd.resolve();
                    }, function (response) {
                        dfd.reject(response.data.reason);
                    });

                    return dfd.promise;
                },
                logoutUser: function () {
                    var dfd = $q.defer();
                    $http.post('/logout', { logout: true }).then(function () {
                        mvIdentity.currentUser = undefined;
                        dfd.resolve();
                    });

                    return dfd.promise;
                },
                authorizeCurrentUserForRoute: function (role) {
                    if (mvIdentity.isAuthorized(role)) {
                        return true;
                    } else {
                        $q.reject('403');
                    }
                },
                authorizeAuthenticatedUserForRoute: function () {
                    if (mvIdentity.isAuthenticated()) {
                        return true;
                    } else {
                        $q.reject('403');
                    }
                }
            }
        }
    ]);
})();