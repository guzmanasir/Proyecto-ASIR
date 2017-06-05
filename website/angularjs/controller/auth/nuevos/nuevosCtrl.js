/**
 * Created by jesus on 21/05/17.
 */
(function() {
    function nuevosCtrl($http,$auth,$state,$rootScope, nuevos){
        console.log("entro en nuevos")
        var vm = this;
        vm.nuevos = nuevos.data.data.listas;
        console.log("nuevos" , vm.nuevos)
        vm.favorito = function(listaid){
            vm.favoritoId = listaid

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

        vm.play = function(lista){
            //$rootScope.playlist = lista
            $rootScope.$broadcast('playlist',lista);

        }


    }

    angular.module('proyecto')
        .controller('nuevosCtrl',['$http','$auth','$state', '$rootScope', 'nuevos', nuevosCtrl]);

})();
