/**
 * Created by jesus on 17/06/17.
 */
(function() {
    function perfilUsuarioCtrl($http,$auth,$state,$rootScope, lodash, $stateParams, listas, favoritos){
        var vm = this;
        vm.paginaActual = $stateParams.pagina
        vm.paginaActual2 = $stateParams.pagina2

        console.log("entrando en perfil", listas)
        vm.listas = listas.data.data.listas;
        vm.favoritos = favoritos.data.data.listas

        if($stateParams.tab == 1){
            vm.tab1 = true
            vm.tab2 = false
        } else {
            vm.tab1 = false
            vm.tab2 = true
        }

        vm.siguiente = function(pos, index){
            if(pos==1)
                $stateParams.pagina = index
            else
                $stateParams.pagina2 = index
            $state.go($state.current, {pagina: $stateParams.pagina, pagina2: $stateParams.pagina2, tab: pos }, {reload: true});
        }

    }

    angular.module('proyecto')
        .controller('perfilUsuarioCtrl',['$http','$auth','$state', '$rootScope','lodash','$stateParams','listas','favoritos', perfilUsuarioCtrl]);

})();