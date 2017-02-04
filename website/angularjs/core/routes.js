/**
 * Created by guzman on 4/02/17.
 */



(function() {
    function routes($stateProvider,$locationProvider){
        $locationProvider.html5Mode(true);
        $stateProvider
            .state('login',{
                url: "/login",
                controller: 'loginCtrl',
                controllerAs: 'lc',
                templateUrl: '/login'
            })

            .state('registro',{
                url: "/registroc",
                controller: 'registroCtrl',
                controllerAs: 'rc',
                templateUrl: '/registro'
            })
    }

    angular.module('proyecto')
        .config(['$stateProvider', '$locationProvider', routes]);

})();

