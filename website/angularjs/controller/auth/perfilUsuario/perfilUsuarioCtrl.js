/**
 * Created by jesus on 17/06/17.
 */
(function() {
    function perfilUsuarioCtrl($http,$auth,$state,$rootScope, lodash, $stateParams, $mdToast, listas, favoritos){
        var vm = this;
        vm.paginaActual = $stateParams.pagina
        vm.paginaActual2 = $stateParams.pagina2

        //console.log("entrando en perfil", listas)
        //console.log("entrando en perfil favoritos", favoritos)
        vm.listas = listas.data.data.listas;
        vm.favoritos = favoritos.data.data.listas

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

        vm.favorito = function(listaid, por){
            if(por == 1){
                vm.favoritoId = listaid
                lodash.find(vm.listas, {listaid: listaid}).isfavorited = true
                lodash.find(vm.listas, {listaid: listaid}).numfavoritos += 1

                $http.post('/users/favorito', {favoritoId: vm.favoritoId})
                    .then(function(responseOk){
                        //console.log(responseOk)
                        vm.toastFavorito()
                    }, function(responseFail){
                        //console.log(responseFail)
                    })
            } else {
                vm.favoritoId = listaid
                lodash.find(vm.favoritos, {listaid: listaid}).isfavorited = true
                lodash.find(vm.favoritos, {listaid: listaid}).numfavoritos += 1

                $http.post('/users/favorito', {favoritoId: vm.favoritoId})
                    .then(function(responseOk){
                        //console.log(responseOk)
                        vm.toastFavorito()
                    }, function(responseFail){
                        //console.log(responseFail)
                    })
            }

        }

        vm.nofavorito = function(listaid, por){
            if(por == 1){
                vm.nofavoritoId = listaid
                lodash.find(vm.listas, {listaid: listaid}).isfavorited = false
                lodash.find(vm.listas, {listaid: listaid}).numfavoritos -= 1

                $http.post('/users/noFavorito', {noFavoritoId: vm.nofavoritoId})
                    .then(function(responseOk){
                        //console.log(responseOk)
                        vm.toastNoFavorito()
                    }, function(responseFail){
                        //console.log(responseFail)
                    })
            } else {
                vm.nofavoritoId = listaid
                lodash.find(vm.favoritos, {listaid: listaid}).isfavorited = false
                lodash.find(vm.favoritos, {listaid: listaid}).numfavoritos -= 1

                $http.post('/users/noFavorito', {noFavoritoId: vm.nofavoritoId})
                    .then(function(responseOk){
                        //console.log(responseOk)
                        vm.toastNoFavorito()
                    }, function(responseFail){
                        //console.log(responseFail)
                    })
            }
        }

        vm.play = function(lista){
            //$rootScope.playlist = lista
            //console.log("lista reproduciendose", lista)
            $rootScope.$broadcast('playlist',lista);


        }

        vm.reproduccion = function(id, por){
            if(por == 1){
                //console.log("reproduciendo", id)
                lodash.find(vm.listas, {listaid: id}).numreproducciones += 1

                $http.post('/users/reproduccion', {listaid: id})
                    .then(function(responseOk){
                        //console.log(responseOk)

                    }, function(responseFail){
                        //console.log(responseFail)

                    })
            } else {
                //console.log("reproduciendo", lodash.find(vm.favoritos, {listaid: id}).numreproducciones)
                lodash.find(vm.favoritos, {listaid: id}).numreproducciones += 1

                $http.post('/users/reproduccion', {listaid: id})
                    .then(function(responseOk){
                        //console.log(responseOk)

                    }, function(responseFail){
                        //console.log(responseFail)

                    })
            }


        }

        vm.verLista = function(lista){
            //console.log("llamando ver lista", lista)
            $state.go('main.verLista',{lista: lista})
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
        .controller('perfilUsuarioCtrl',['$http','$auth','$state', '$rootScope','lodash','$stateParams','$mdToast','listas','favoritos', perfilUsuarioCtrl]);

})();