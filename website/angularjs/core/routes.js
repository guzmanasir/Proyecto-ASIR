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

            .state('main',{
                url: "/index",
                controller: 'frameCtrl',
                controllerAs: 'fc',
                templateUrl: '/users/frame'
            })
    }

    angular.module('proyecto')
        .config(['$stateProvider', '$locationProvider', '$authProvider',routes]);

})();

