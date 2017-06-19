/**
 * Created by jesus on 17/06/17.
 */
(function() {
    function perfilUsuarioCtrl($http,$auth,$state,$rootScope, lodash, $stateParams, listas, favoritos){
        var vm = this;
        vm.paginaActual = $stateParams.pagina
        vm.paginaActual2 = $stateParams.pagina2

        console.log("entrando en perfil", listas)
        console.log("entrando en perfil favoritos", favoritos)
        vm.listas = listas.data.data.listas;
        vm.favoritos = favoritos.data.data.listas

        vm.favorito = function(listaid){
            vm.favoritoId = listaid
            lodash.find(vm.listas, {listaid: listaid}).isfavorited = true
            lodash.find(vm.listas, {listaid: listaid}).numfavoritos += 1

            $http.post('/users/favorito', {favoritoId: vm.favoritoId})
                .then(function(responseOk){
                    console.log(responseOk)
                    swal(
                        '',
                        'OK',
                        'success'
                    )
                }, function(responseFail){
                    console.log(responseFail)
                    swal(
                        'Oops...',
                        'Error',
                        'error'
                    )
                })

        }

        vm.nofavorito = function(listaid){
            vm.nofavoritoId = listaid
            lodash.find(vm.listas, {listaid: listaid}).isfavorited = false
            lodash.find(vm.listas, {listaid: listaid}).numfavoritos -= 1

            $http.post('/users/noFavorito', {noFavoritoId: vm.nofavoritoId})
                .then(function(responseOk){
                    console.log(responseOk)
                }, function(responseFail){
                    console.log(responseFail)
                })
        }

        vm.play = function(lista){
            //$rootScope.playlist = lista
            console.log("lista reproduciendose", lista)
            $rootScope.$broadcast('playlist',lista);


        }

        vm.reproduccion = function(id){
            console.log("reproduciendo", id)
            console.log
            lodash.find(vm.listas, {listaid: id}).numreproducciones += 1

            $http.post('/users/reproduccion', {listaid: id})
                .then(function(responseOk){
                    console.log(responseOk)

                }, function(responseFail){
                    console.log(responseFail)

                })


        }

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