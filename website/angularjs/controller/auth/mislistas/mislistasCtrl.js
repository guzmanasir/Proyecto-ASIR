/**
 * Created by jesus on 21/05/17.
 */
(function() {
    function mislistasCtrl($http,$auth,$state,$rootScope, listas){
        console.log("entreo")
        var vm = this;
        vm.listas = listas.data.data.listas;
        console.log(listas)
        vm.edit = function(lista){
            console.log("llamando funcione edit", lista)
            $state.go(
                'main.editList',
                {lista: lista}
            )
        }

    }

    angular.module('proyecto')
        .controller('mislistasCtrl',['$http','$auth','$state', '$rootScope','listas', mislistasCtrl]);

})();
