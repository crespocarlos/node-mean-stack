(function () {
    'use strict';

    angular.module('app').factory('mvIdentity', ['$window', 'mvUser',
        function ($window, mvUser) {
            var currentUser;
            if (!!$window.bootstrappedUserObject) {
                currentUser = new mvUser();
                angular.extend(currentUser, $window.bootstrappedUserObject);
            }
            return {
                currentUser: currentUser,
                isAuthenticated: function () {
                    return !!this.currentUser;
                },
                isAuthorized: function (role) {
                    return !!currentUser && currentUser.roles.indexOf('admin') > -1;
                }
            }
        }]);
})();