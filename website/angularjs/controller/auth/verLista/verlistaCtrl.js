/**
 * Created by jesus on 11/06/17.
 */
(function() {
    function verlistaCtrl($http,$auth,$state,$rootScope, $stateParams, $mdDialog, $mdToast, lodash){
        //if(lodash.isNull($stateParams.lista)) return $state.go("main.mislistas")
        //console.log("entreo aqui")
        if(!$stateParams.lista)
            $state.go('main.nuevos')
        var vm = this;
        vm.verLista = $stateParams.lista
        //console.log("toda ls lista", $stateParams)
        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        vm.toastPosition = angular.extend({},last);

        vm.getToastPosition = function() {
            sanitizePosition();

            return Object.keys(vm.toastPosition)
                .filter(function(pos) { return vm.toastPosition[pos]; })
                .join(' ');
        };

        function sanitizePosition() {
            var current = vm.toastPosition;

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;

            last = angular.extend({},current);
        }

        vm.toastFavorito = function() {
            var pinTo = vm.getToastPosition();
            //console.log("entro en toast")
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Has añadido esta lista a favorito')
                    .position(pinTo )
                    .hideDelay(3000)
            );
        };

        vm.toastNoFavorito = function() {
            var pinTo = vm.getToastPosition();
            //console.log("entro en toast")
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Has eliminado esta lista de favoritos')
                    .position(pinTo )
                    .hideDelay(3000)
            );
        };


        vm.favorito = function(listaid){
            vm.favoritoId = listaid
            vm.verLista.isfavorited = true
            vm.verLista.numfavoritos += 1

            $http.post('/users/favorito', {favoritoId: vm.favoritoId})
                .then(function(responseOk){
                    //console.log(responseOk)
                    vm.toastFavorito()
                }, function(responseFail){
                    //console.log(responseFail)
                })

        }

        vm.nofavorito = function(listaid){
            vm.nofavoritoId = listaid
            vm.verLista.isfavorited = false
            vm.verLista.numfavoritos -= 1

            $http.post('/users/noFavorito', {noFavoritoId: vm.nofavoritoId})
                .then(function(responseOk){
                    vm.toastNoFavorito()
                    //console.log(responseOk)
                }, function(responseFail){
                    //console.log(responseFail)
                })
        }

        vm.play = function(lista){
            //$rootScope.playlist = lista
            //console.log("lista reproduciendose", lista)
            $rootScope.$broadcast('playlist',lista);


        }

        vm.reproduccion = function(id){
            //console.log("reproduciendo", id)
            //console.log
            lodash.find(vm.verLista, {listaid: id}).numreproducciones += 1

            $http.post('/users/reproduccion', {listaid: id})
                .then(function(responseOk){
                    //console.log(responseOk)

                }, function(responseFail){
                    //console.log(responseFail)

                })


        }


    }

    angular.module('proyecto')
        .controller('verlistaCtrl',['$http','$auth','$state', '$rootScope','$stateParams', '$mdDialog', '$mdToast', 'lodash', verlistaCtrl]);

})();
