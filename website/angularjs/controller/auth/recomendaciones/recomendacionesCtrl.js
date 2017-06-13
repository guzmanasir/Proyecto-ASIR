/**
 * Created by jesus on 12/06/17.
 */

(function() {
    function recomendacionesCtrl($http,$auth,$state,$rootScope, recomendadas){
        console.log("entreo")
        var vm = this;
        vm.recomendadas = recomendadas.data.data;
        console.log("recomendaciones", vm.recomendadas)

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
        .controller('recomendacionesCtrl',['$http','$auth','$state', '$rootScope','recomendadas', recomendacionesCtrl]);

})();
