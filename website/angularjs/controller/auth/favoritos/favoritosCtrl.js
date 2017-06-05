/**
 * Created by jesus on 3/06/17.
 */
(function() {
    function favoritosCtrl($http,$auth,$state,$rootScope, listas){
        console.log("entreo")
         var vm = this;
         vm.listas = listas.data.data.listas;
         console.log(listas)

    //     vm.play = function(lista){
    //         //$rootScope.playlist = lista
    //         $rootScope.$broadcast('playlist',lista);
    //
    //     }
    //
     }

    angular.module('proyecto')
        .controller('favoritosCtrl',['$http','$auth','$state', '$rootScope','listas', favoritosCtrl]);

})();
