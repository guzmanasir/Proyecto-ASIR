/**
 * Created by jesus on 15/06/17.
 */
(function() {
    function homeCtrl($http,$auth,$state,$rootScope, nuevosHome, popularesHome, masEscuchada){
        console.log("entro home")
        var vm = this;
        vm.nuevosHome = nuevosHome.data.data.listas.slice(0,4);
        vm.popularesHome = popularesHome.data.data.listas.slice(0,4);
        vm.masEscuchada = masEscuchada.data.data.listas
        console.log(vm.nuevosHome)
        console.log(vm.popularesHome)
        console.log(vm.masEscuchada)


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
        .controller('homeCtrl',['$http','$auth','$state', '$rootScope', 'nuevosHome', 'popularesHome', 'masEscuchada', homeCtrl]);

})();
