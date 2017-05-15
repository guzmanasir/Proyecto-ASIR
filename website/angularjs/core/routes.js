/**
 * Created by guzman on 4/02/17.
 */



(function() {
    function routes($stateProvider,$locationProvider,$authProvider){
        $locationProvider.html5Mode(true);
        $authProvider.loginUrl = '/loginForm';
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = 'satellizer';
        $stateProvider

            .state('home',{
                abstract: true,
                templateUrl: '/frameNoAuth'
            })

            .state('home.login',{
                url: "/",
                controller: 'loginCtrl',
                controllerAs: 'lc',
                templateUrl: '/login'
            })

            .state('home.registro',{
                url: "/signup",
                controller: 'registroCtrl',
                controllerAs: 'rc',
                templateUrl: '/registro'
            })

            .state('main',{
                abstract: true,
                templateUrl: '/users/frame'
            })

            .state('main.index',{
                url: "/principal",
                // controller: 'indexController',
                // controllerAs: 'ic',
                templateUrl: '/users/index'
            })

    }

    angular.module('proyecto')
        .config(['$stateProvider', '$locationProvider', '$authProvider',routes]);

})();

