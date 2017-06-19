/**
 * Created by jesus on 11/06/17.
 */
(function() {
    function verlistaCtrl($http,$auth,$state,$rootScope, $stateParams, $mdDialog, lodash){
        //if(lodash.isNull($stateParams.lista)) return $state.go("main.mislistas")
        console.log("entreo aqui")
        if(!$stateParams.lista)
            $state.go('main.nuevos')
        var vm = this;
        vm.verLista = $stateParams.lista
        console.log("toda ls lista", $stateParams)

        vm.favorito = function(listaid){
            vm.favoritoId = listaid
            vm.verLista.isfavorited = true
            vm.verLista.numfavoritos += 1

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
            vm.verLista.isfavorited = false
            vm.verLista.numfavoritos -= 1

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
            lodash.find(vm.verLista, {listaid: id}).numreproducciones += 1

            $http.post('/users/reproduccion', {listaid: id})
                .then(function(responseOk){
                    console.log(responseOk)

                }, function(responseFail){
                    console.log(responseFail)

                })


        }


    }

    angular.module('proyecto')
        .controller('verlistaCtrl',['$http','$auth','$state', '$rootScope','$stateParams', '$mdDialog', 'lodash', verlistaCtrl]);

})();
