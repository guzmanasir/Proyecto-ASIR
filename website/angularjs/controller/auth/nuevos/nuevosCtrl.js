/**
 * Created by jesus on 21/05/17.
 */
(function() {
    function nuevosCtrl($http,$auth,$state,$rootScope, lodash, $stateParams, nuevos, tags){
        console.log("entro en nuevos")
        var vm = this;
        console.log("los tags", tags.data.data)
        vm.nuevos = nuevos.data.data.listas;
        vm.tags = tags.data.data
        console.log("nuevos" , vm.nuevos)
        vm.paginaActual = $stateParams.pagina
        vm.paginaMaxima = vm.nuevos[0].totalListas
        vm.posicion = false
        console.log("la pagina total", vm.paginaMaxima)
        console.log("la pagina actual", vm.paginaActual)



        vm.buscar = function(){
            console.log("%"+vm.busqueda+"%")
            vm.buscador = {tipo: vm.tipo, busqueda: vm.busqueda,  ordenar: vm.ordenar, idtag: vm.etiqueta }

            console.log("buscador", vm.buscador)
            vm.paginaActual = 1
            if(!lodash.isUndefined(vm.buscador.busqueda)){
                vm.buscador.busqueda = "%"+vm.buscador.busqueda+'%'
                $http.post('/users/search/'+vm.paginaActual, vm.buscador)
                    .then(function(responseOk){
                        console.log("datos brutos", responseOk)
                        console.log("datos busqueda", responseOk.data.data.listas)
                        //$state.go('main.buscador', {resultado: responseOk.data.data.listas})
                        vm.nuevos = responseOk.data.data.listas
                        vm.vacioMensaje =  "No hay ningun resultado"
                        vm.vacio =  (!responseOk.data.data.listas) ? true : false
                        vm.paginaMaxima = responseOk.data.data.listas[0].totalListas
                        vm.posicion = true

                    }, function(responseFail){
                        console.log("emptyyyy query", responseFail)
                    })
            } else {
                vm.vacioMensaje =  "No hay ningun resultado"
                vm.vacio = true
            }
        }


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
            console.log
            lodash.find(vm.nuevos, {listaid: id}).numreproducciones += 1

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
            if(!vm.posicion){
                $stateParams.pagina = index
                $state.go($state.current, {pagina: $stateParams.pagina}, {reload: true});
            } else {
                console.log("la pagina en el else", vm.paginaActual)
                $http.post('/users/search/'+vm.paginaActual, vm.buscador)
                    .then(function(responseOk){
                        console.log("datos brutos2", responseOk)
                        console.log("datos busqueda2", responseOk.data.data.listas)
                        //$state.go('main.buscador', {resultado: responseOk.data.data.listas})
                        vm.nuevos = responseOk.data.data.listas
                        vm.posicion = true
                    }, function(responseFail){
                        console.log("emptyyyy query", responseFail)
                    })
            }
        }


    }

    angular.module('proyecto')
        .controller('nuevosCtrl',['$http','$auth','$state', '$rootScope', 'lodash', '$stateParams', 'nuevos', 'tags', nuevosCtrl]);

})();
