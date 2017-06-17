/**
 * Created by jesus on 8/06/17.
 */
(function() {
    function popularesCtrl($http,$auth,$state,$rootScope, listas){
        console.log("entreo en populares2")
        console.log("populares")
        var vm = this;
        vm.listas = listas.data.data.listas;
        console.log("populares", vm.listas)

        //     vm.edit = function(lista){
        //         console.log("llamando funcione edit", lista)
        //         $state.go('main.editList',{lista: lista})
        //     }
        //
        //     vm.play = function(lista){
        //         //$rootScope.playlist = lista
        //         $rootScope.$broadcast('playlist',lista);
        //
        //     }
        //
    }

    angular.module('proyecto')
        .controller('popularesCtrl',['$http','$auth','$state', '$rootScope', 'listas', popularesCtrl]);

})();
