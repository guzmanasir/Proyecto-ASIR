/**
 * Created by guzman on 4/02/17.
 */



(function() {
    function routes($stateProvider,$locationProvider,$authProvider,$urlRouterProvider){
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

            .state('main.home',{
                url: "/home",
                controller: 'homeCtrl',
                controllerAs: 'hct',
                templateUrl: '/users/tempHome',
                params: {requireLogin : true},
                resolve : {
                    nuevosHome: ['$http',function($http){
                        return $http.get('/users/newLists')
                            .then(function(response){
                                return response;
                            },function(response) {
                                return response;
                            })
                    }],
                    popularesHome: ['$http',function($http){
                        return $http.get('/users/populares')
                            .then(function(response){
                                return response;
                            },function(response) {
                                return response;
                            })
                    }],
                    masEscuchada: ['$http',function($http){
                        return $http.get('/users/masEscuchada')
                            .then(function(response){
                                return response;
                            },function(response) {
                                return response;
                            })
                    }]
                }
            })


            .state('main.nuevos',{
                url: "/nuevos",
                controller: 'nuevosCtrl',
                controllerAs: 'nct',
                templateUrl: '/users/tempNuevos',
                params: {requireLogin : true, page:null},
                resolve : {
                    nuevos: ['$http',function($http,$stateParams){
                        return $http.get('/users/newLists/')
                            .then(function(response){
                                return response;
                            },function(response) {
                                return response;
                            })
                    }]
                }
            })

            .state('main.populares',{
                url: "/populares",
                controller: 'popularesCtrl',
                controllerAs: 'pct',
                templateUrl: '/users/tempPopulares',
                params: {requireLogin : true},
                resolve : {
                    listas: ['$http',function($http){
                        return $http.get('/users/populares')
                            .then(function(response){
                                return response;
                            },function(response) {
                                return response;
                            })
                    }]
                }
            })

            .state('main.recomendaciones',{
                url: "/recomendaciones",
                controller: 'recomendacionesCtrl',
                controllerAs: 'rct',
                templateUrl: '/users/tempRecomendaciones',
                params: {requireLogin : true},
                resolve : {
                    recomendadas: ['$http',function($http){
                        return $http.get('/users/recomendaciones')
                            .then(function(response){
                                return response;
                            },function(response) {
                                return response;
                            })
                    }]
                }
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

            .state('main.favoritos',{
                url: "/favoritos",
                controller: 'favoritosCtrl',
                controllerAs: 'flc',
                templateUrl: '/users/tempFavoritos',
                params: {requireLogin : true},
                resolve : {
                    listas: ['$http',function($http){
                        return $http.get('/users/misFavoritos')
                            .then(function(response){
                                return response;
                            },function(response) {
                                return response;
                            })
                    }]
                }
            })

            .state('main.buscador',{
                url: "/buscar",
                controller: 'buscadorCtrl',
                controllerAs: 'blc',
                templateUrl: '/users/tempBuscador',
                params: {requireLogin : true, resultado: null}
            })

            .state('main.editList',{
                url: "/mislistas/edit",
                controller: 'editListCtrl',
                controllerAs: 'elc',
                templateUrl: '/users/tempEditList',
                params: {requireLogin : true, lista: null}
            })

            .state('main.verLista',{
                url: "/nuevos/lista",
                controller: 'verlistaCtrl',
                controllerAs: 'vlc',
                templateUrl: '/users/tempVerLista',
                params: {requireLogin : true, lista: null}
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

            .state('404',{
                url: "/404",
                template: '<p>404</p>'
            })

        $urlRouterProvider.otherwise('/mislistas')



    }

    angular.module('proyecto')
        .config(['$stateProvider', '$locationProvider', '$authProvider', '$urlRouterProvider', routes]);

})();

