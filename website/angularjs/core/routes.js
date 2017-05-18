/**
 * Created by guzman on 4/02/17.
 */



(function() {
    function routes($stateProvider,$locationProvider,$authProvider){
        $locationProvider.html5Mode(true);
        $authProvider.loginUrl = '/loginForm';
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = 'miApp';
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
                controller: 'frameCtrl',
                controllerAs: 'fc',
                templateUrl: '/users/frame'
            })


            .state('main.nuevos',{
                url: "/nuevos",
                //controller: 'indexController',
                //controllerAs: 'ic',
                templateUrl: '/users/tempNuevos',
                params: {requireLogin : true}
            })

            .state('main.populares',{
                url: "/populares",
                //controller: 'indexController',
                //controllerAs: 'ic',
                templateUrl: '/users/tempPopulares',
                params: {requireLogin : true}
            })

            .state('main.recomendaciones',{
                url: "/recomendaciones",
                //controller: 'indexController',
                //controllerAs: 'ic',
                templateUrl: '/users/tempRecomendaciones',
                params: {requireLogin : true}
            })

            .state('main.logout',{
                url: "/logout",
                controller: 'logoutCtrl',
                controllerAs: 'lgc',
                template: '<p>Logout</p>'
            })

            .state('403',{
                url: "/403",
                templateUrl: '/403'
            })



    }

    angular.module('proyecto')
        .config(['$stateProvider', '$locationProvider', '$authProvider',routes]);

})();

