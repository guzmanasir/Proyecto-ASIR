/**
 * Created by jesus on 18/05/17.
 */
(function() {
    function run($rootScope,$state,$auth){

        $rootScope.$on('Loginfail',function(datos){
            $state.go('403')
        })

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options){
                $rootScope.estadoActual = toState.name
                //console.log("cambiando de estado",toState.params.redireccion )
                if ( toState.params && toState.params.redireccion && $auth.isAuthenticated() ) {
                    event.preventDefault();
                    //console.log("entrando redireccion")
                    $state.go('main.home');
                }
                if ( toState.params && toState.params.requireLogin && !$auth.isAuthenticated() ) {
                    event.preventDefault();
                    $state.go('403');
                }

                // transitionTo() promise will be rejected with
                // a 'transition prevented' error
            })
        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, options){
                    event.preventDefault();
                    $state.go('404');

            })


    }

    angular.module('proyecto')
        .run(['$rootScope','$state', '$auth', run]);

})();
