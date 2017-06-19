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
                templateUrl: '/login',
                params: {redireccion : true}
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
                    }],
                    tagCloud: ['$http',function($http){
                        return $http.get('/users/tagCloud')
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
                params: {requireLogin : true, pagina:1},
                resolve : {
                    nuevos: ['$http','$stateParams',function($http,$stateParams){
                        return $http.get('/users/newLists/'+$stateParams.pagina)
                            .then(function(response){
                               // console.log("er param", $state)
                                return response;
                            },function(response) {
                                return response;
                            })
                    }],
                    tags: ['$http',function($http){
                        return $http.get('/users/getTags')
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

            .state('main.perfilUsuario',{
                url: "/perfilUsuario?idUser",
                controller: 'perfilUsuarioCtrl',
                controllerAs: 'puct',
                templateUrl: '/users/tempPerfilUsuario',
                params: {requireLogin : true, pagina: 1, pagina2: 1, tab: 1},
                resolve : {
                    listas: ['$http','$stateParams',function($http,$stateParams){
                        return $http.get('/users/perfilUsuario/'+$stateParams.idUser+"/"+$stateParams.pagina)
                            .then(function(response){
                                console.log("response ok ",response)
                                return response;
                            },function(response) {
                                console.error("error en response ",response)
                                return response;
                            })
                    }],
                    favoritos: ['$http','$stateParams',function($http, $stateParams){
                        return $http.get('/users/otrosFavoritos/'+$stateParams.idUser+"/"+$stateParams.pagina2)
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
                        return $http.get('/users/recomendacionesQuery')
                            .then(function(response){
                                return response;
                            },function(response) {
                                return response;
                            })
                    }]
                }
            })

            .state('main.perfil',{
                url: "/perfil",
                controller: 'mislistasCtrl',
                controllerAs: 'mlc',
                templateUrl: '/users/tempMisListas',
                params: {requireLogin : true, pagina: 1, pagina2: 1, tab:1},
                resolve : {
                    listas: ['$http','$stateParams', function($http,$stateParams){
                        return $http.get('/users/getLists/'+$stateParams.pagina)
                            .then(function(response){
                                return response;
                            },function(response) {
                                return response;
                            })
                    }],
                    favoritos: ['$http','$stateParams',function($http, $stateParams){
                        return $http.get('/users/misFavoritos/'+$stateParams.pagina2)
                            .then(function(response){
                                return response;
                            },function(response) {
                                return response;
                            })
                    }],
                    infoUsuario: ['$http',function($http){
                        return $http.get('/users/infoUsuario')
                            .then(function(response){
                                return response;
                            },function(response) {
                                return response;
                            })
                    }]
                }
            })

            // .state('main.favoritos',{
            //     url: "/favoritos",
            //     controller: 'favoritosCtrl',
            //     controllerAs: 'flc',
            //     templateUrl: '/users/tempFavoritos',
            //     params: {requireLogin : true},
            //     resolve : {
            //         listas: ['$http',function($http){
            //             return $http.get('/users/misFavoritos')
            //                 .then(function(response){
            //                     return response;
            //                 },function(response) {
            //                     return response;
            //                 })
            //         }]
            //     }
            // })

            .state('main.buscador',{
                url: "/buscar",
                controller: 'buscadorCtrl',
                controllerAs: 'blc',
                templateUrl: '/users/tempBuscador',
                params: {requireLogin : true, resultado: null}
            })



            .state('main.editList',{
                url: "/perfil/edit",
                controller: 'editListCtrl',
                controllerAs: 'elc',
                templateUrl: '/users/tempEditList',
                params: {requireLogin : true, lista: null}
            })

            .state('main.editInfo',{
                url: "/perfil/editInfo",
                controller: 'editInfoCtrl',
                controllerAs: 'eict',
                templateUrl: '/users/tempEditInfo',
                params: {requireLogin : true, datos: null}
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

        $urlRouterProvider.otherwise('/perfil')



    }

    angular.module('proyecto')
        .config(['$stateProvider', '$locationProvider', '$authProvider', '$urlRouterProvider', routes]);

})();

