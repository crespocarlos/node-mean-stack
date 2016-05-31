(function () {
    'use strict';

    angular.module('app', ['ngResource', 'ngRoute']);

    angular.module('app').config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            var routeRouteChecks = {
                admin: function (mvAuth) {
                    return mvAuth.authorizeCurrentUserForRoute('admin');
                }
            };

            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/',
                {
                    templateUrl: '/partials/main/main',
                    controller: 'mvMainCtrl'
                })
                .when('/admin/users',
                {
                    templateUrl: '/partials/admin/user-list',
                    controller: 'mvUserListCtrl',
                    resolve: routeRouteChecks.admin
                })
                .when('/signup',
                {
                    templateUrl: '/partials/account/signup',
                    controller: 'mvSignupCtrl'
                });
        }
    ]);

    angular.module('app').run(function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (evt, current, preveious, rejetion) {
            if (rejetion === '403') {
                $location.path('/');
            }
        })
    });
})();