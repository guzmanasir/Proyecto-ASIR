/**
 * Created by jesus on 12/06/17.
 */

(function() {
    function recomendacionesCtrl($http,$auth,$state,$rootScope,lodash, $mdToast,  recomendadas){
        var vm = this;
        vm.recomienda = false
        //console.log("las listas", recomendadas)
        if(recomendadas.data.data.artistas.length == 0){
            //console.log("holi")
            vm.recomienda = true
        } else {
            vm.artistas = [recomendadas.data.data.artistas]
            vm.listas = recomendadas.data.data.listas.listas.slice(0,4)
            //console.log("las listas")
            //console.log("artista id", vm.artistas[0][0].lista_idlista)
            vm.ids = lodash.uniq(lodash.map(vm.artistas, 'lista_idlista')).slice(0,4)
            //vm.recomendadas = [{artistas: [], listaparaPintar:{}},{}]
            vm.recomendadas = []
            lodash.forEach(vm.ids, function(item) {
                vm.recomendadas.push({artistas: lodash.map(lodash.filter(vm.artistas,{lista_idlista: item}), 'artista'),
                    listas: lodash.filter(vm.listas.listas,{listaid: item})
                })
            })

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


            //console.log("recomendaciones", vm.recomendadas)

            vm.favorito = function(listaid){
                //console.log("entro")
                //console.log("hola", vm.recomendadas)
                vm.favoritoId = listaid
                lodash.find(vm.listas, {listaid: listaid}).isfavorited = true
                lodash.find(vm.listas, {listaid: listaid}).numfavoritos += 1

                $http.post('/users/favorito', {favoritoId: vm.favoritoId})
                    .then(function(responseOk){
                        vm.toastFavorito()
                        //console.log(responseOk)

                    }, function(responseFail){
                        //console.log(responseFail)

                    })

            }

            vm.nofavorito = function(listaid){
                vm.nofavoritoId = listaid
                lodash.find(vm.listas, {listaid: listaid}).isfavorited = false
                lodash.find(vm.listas, {listaid: listaid}).numfavoritos -= 1

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
                lodash.find(vm.listas, {listaid: id}).numreproducciones += 1

                $http.post('/users/reproduccion', {listaid: id})
                    .then(function(responseOk){
                        //console.log(responseOk)

                    }, function(responseFail){
                        //console.log(responseFail)

                    })


            }
        }

    }


    angular.module('proyecto')
        .controller('recomendacionesCtrl',['$http','$auth','$state', '$rootScope','lodash', '$mdToast', 'recomendadas', recomendacionesCtrl]);

})();
