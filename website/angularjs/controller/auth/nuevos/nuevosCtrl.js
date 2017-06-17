/**
 * Created by jesus on 21/05/17.
 */
(function() {
    function nuevosCtrl($http,$auth,$state,$rootScope, lodash, $stateParams, nuevos){
        console.log("entro en nuevos")
        var vm = this;
        vm.nuevos = nuevos.data.data.listas;
        console.log("nuevos" , vm.nuevos)
        vm.paginaActual = $stateParams.pagina
        vm.paginaMaxima = Math.ceil(vm.nuevos[0].totalListas / 9)
        console.log("la pagina total", vm.paginaMaxima)
        console.log("la pagina actual", vm.paginaActual)





        vm.favorito = function(listaid){
            vm.favoritoId = listaid
            lodash.find(vm.nuevos, {listaid: listaid}).isfavorited = true
            lodash.find(vm.nuevos, {listaid: listaid}).numfavoritos += 1

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
            lodash.find(vm.nuevos, {listaid: listaid}).isfavorited = false
            lodash.find(vm.nuevos, {listaid: listaid}).numfavoritos -= 1

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

            $http.post('/users/reproduccion', {listaid: id})
                .then(function(responseOk){
                    console.log(responseOk)

                }, function(responseFail){
                    console.log(responseFail)

                })


        }

        vm.verLista = function(lista){
            console.log("llamando ver lista", lista)
            $state.go('main.verLista',{lista: lista})
        }

        vm.anterior = function(){

        }

        vm.siguiente = function(index){
            $stateParams.pagina = index
            $state.go($state.current, {pagina: $stateParams.pagina}, {reload: true});
        }


    }

    angular.module('proyecto')
        .controller('nuevosCtrl',['$http','$auth','$state', '$rootScope', 'lodash', '$stateParams', 'nuevos', nuevosCtrl]);

})();
