/**
 * Created by jesus on 5/06/17.
 */
(function() {
    function buscadorCtrl($http,$auth,$state,$rootScope, $stateParams){
        console.log("entreo")
        var vm = this;
        vm.listas = $stateParams.resultado
        console.log("mi busqueda premoh", vm.listas)

        //     vm.play = function(lista){
        //         //$rootScope.playlist = lista
        //         $rootScope.$broadcast('playlist',lista);
        //
        //     }
        //
        // vm.play = function(lista){
        //     //$rootScope.playlist = lista
        //     $rootScope.$broadcast('playlist',lista);
        // }



    }


    angular.module('proyecto')
        .controller('buscadorCtrl',['$http','$auth','$state', '$rootScope','$stateParams', buscadorCtrl]);

})();
