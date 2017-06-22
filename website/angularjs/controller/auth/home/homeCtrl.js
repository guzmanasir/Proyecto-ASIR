/**
 * Created by jesus on 15/06/17.
 */
(function() {
    function homeCtrl($http,$auth,$state,$rootScope,lodash,$mdToast, nuevosHome, popularesHome, masEscuchada){
        //console.log("entro home")
        var vm = this;

        vm.nuevosHome = nuevosHome.data.data.listas.slice(0,4);
        vm.popularesHome = popularesHome.data.data.listas.slice(0,4);
        vm.masEscuchada = masEscuchada.data.data.listas
        vm.nombreUsuario = $rootScope.infoUsuario.nombre
        //console.log("nuevoshome", vm.nuevosHome)
        //console.log("populares sin tocar", popularesHome)
        //console.log(vm.popularesHome)
        console.log("masescuchada", vm.masEscuchada)

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

        vm.verLista = function(lista){
            //console.log("llamando ver lista", lista)
            $state.go('main.verLista',{lista: lista})
        }

        vm.favorito = function(listaid, otro){
            //console.log("entreo en favorito", otro, listaid)
            if(otro == 1){
                //console.log("entro en favoritos")
                vm.favoritoId = listaid
                //console.log(vm.favoritoId)
                lodash.find(vm.nuevosHome , {listaid: listaid}).isfavorited = true
                lodash.find(vm.nuevosHome , {listaid: listaid}).numfavoritos += 1

                $http.post('/users/favorito', {favoritoId: vm.favoritoId})
                    .then(function(responseOk){
                        vm.toastFavorito()
                        //console.log(responseOk)
                    }, function(responseFail){
                        //console.log(responseFail)
                    })
            } else if (otro == 2) {
                //console.log("entro en favoritos 2")
                vm.favoritoId = listaid
                //console.log("favoritoid", vm.favoritoId)
                lodash.find(vm.popularesHome , {listaid: listaid}).isfavorited = true
                lodash.find(vm.popularesHome , {listaid: listaid}).numfavoritos += 1

                $http.post('/users/favorito', {favoritoId: vm.favoritoId})
                    .then(function(responseOk){
                        vm.toastFavorito()
                        //console.log(responseOk)
                    }, function(responseFail){
                        //console.log(responseFail)
                    })
            } else {
                //console.log("entro en favoritos 3")
                vm.favoritoId = listaid
                //console.log("favoritoid", vm.favoritoId)
                lodash.find(vm.masEscuchada, {listaid: listaid}).isfavorited = true
                lodash.find(vm.masEscuchada , {listaid: listaid}).numfavoritos += 1

                $http.post('/users/favorito', {favoritoId: vm.favoritoId})
                    .then(function(responseOk){
                        vm.toastFavorito()
                        //console.log(responseOk)
                    }, function(responseFail){
                        //console.log(responseFail)
                    })
            }

        }

        vm.nofavorito = function(listaid, otro){
            if(otro == 1){
                vm.nofavoritoId = listaid
                lodash.find(vm.nuevosHome , {listaid: listaid}).isfavorited = false
                lodash.find(vm.nuevosHome , {listaid: listaid}).numfavoritos -= 1

                $http.post('/users/noFavorito', {noFavoritoId: vm.nofavoritoId})
                    .then(function(responseOk){
                        vm.toastNoFavorito()
                        //console.log(responseOk)
                    }, function(responseFail){
                        //console.log(responseFail)
                    })
            } else if (otro == 2) {
                vm.nofavoritoId = listaid
                lodash.find(vm.popularesHome , {listaid: listaid}).isfavorited = false
                lodash.find(vm.popularesHome , {listaid: listaid}).numfavoritos -= 1

                $http.post('/users/noFavorito', {noFavoritoId: vm.nofavoritoId})
                    .then(function(responseOk){
                        vm.toastNoFavorito()
                        //console.log(responseOk)
                    }, function(responseFail){
                        //console.log(responseFail)
                    })
            } else {
                vm.nofavoritoId = listaid
                lodash.find(vm.masEscuchada , {listaid: listaid}).isfavorited = false
                lodash.find(vm.masEscuchada , {listaid: listaid}).numfavoritos -= 11

                $http.post('/users/noFavorito', {noFavoritoId: vm.nofavoritoId})
                    .then(function(responseOk){
                        vm.toastNoFavorito()
                        //console.log(responseOk)
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

        vm.reproduccion = function(id, otro){

            if(otro == 1){
                //console.log("reproduciendo", id, otro)
                lodash.find(vm.nuevosHome , {listaid: id}).numreproducciones += 1
                //Qif(lodas.is)


                $http.post('/users/reproduccion', {listaid: id})
                    .then(function(responseOk){
                        //console.log(responseOk)

                    }, function(responseFail){
                        //console.log(responseFail)

                    })
            } else if (otro == 2) {
                //console.log("reproduciendo", id)
                lodash.find(vm.popularesHome , {listaid: id}).numreproducciones += 1

                $http.post('/users/reproduccion', {listaid: id})
                    .then(function(responseOk){
                        //console.log(responseOk)

                    }, function(responseFail){
                        //console.log(responseFail)

                    })
            } else {
                //console.log("reproduciendo dentro", id, vm.masEscuchada[0].numreproducciones)

                vm.masEscuchada[0].numreproducciones += 1

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




    }


    angular.module('proyecto')
        .controller('homeCtrl',['$http','$auth','$state', '$rootScope','lodash', '$mdToast', 'nuevosHome', 'popularesHome', 'masEscuchada', homeCtrl]);

})();
