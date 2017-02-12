/**
 * Created by guzman on 4/02/17.
 */



(function() {
    function routes($stateProvider,$locationProvider){
        $locationProvider.html5Mode(true);
        $stateProvider
            .state('login',{
                url: "/inicio",
                controller: 'loginCtrl',
                controllerAs: 'lc',
                templateUrl: '/login'
            })

            .state('registro',{
                url: "/signup",
                controller: 'registroCtrl',
                controllerAs: 'rc',
                templateUrl: '/registro'
            })
    }

    angular.module('proyecto')
        .config(['$stateProvider', '$locationProvider', routes]);

})();

