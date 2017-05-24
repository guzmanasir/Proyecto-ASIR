/**
 * Created by guzman on 4/02/17.
 */



(function() {
    function routes($stateProvider,$locationProvider,$authProvider){
        $locationProvider.html5Mode(true);
        $authProvider.loginUrl = '/loginForm';
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = 'miApp';
        $authProvider.tokenHeader = 'token';

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
                templateUrl: '/users/frame',
                resolve : {
                    tags: ['$http',function($http){
                        return $http.get('/users/getTags')
                            .then(function(response){
                                console.log("query tags")
                                return response;
                            },function(response) {
                                console.log("error query tags")
                                return response;
                            })
                    }]
                }
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

            .state('main.mislistas',{
                url: "/mislistas",
                controller: 'mislistasCtrl',
                controllerAs: 'mlc',
                templateUrl: '/users/tempMisListas',
                params: {requireLogin : true},
                resolve : {
                    listas: ['$http',function($http){
                        return $http.get('/users/getLists')
                            .then(function(response){
                                return response;
                            },function(response) {
                                return response;
                            })
                    }]
                }
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

