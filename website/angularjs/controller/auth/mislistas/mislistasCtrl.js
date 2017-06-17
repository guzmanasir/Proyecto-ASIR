/**
 * Created by jesus on 21/05/17.
 */
(function() {
    function mislistasCtrl($http,$auth,$state,$rootScope, lodash, listas, favoritos, infoUsuario){

        var vm = this;
        vm.listas = listas.data.data.listas;
        vm.favoritos = favoritos.data.data.listas;
        console.log("mis favoritos")
        vm.infoUsuario = infoUsuario.data.data
        vm.abrirInput = false
        vm.nombreCambia = false
        vm.emailCambia = false
        vm.passwordCambia = false
        console.log(listas)
        vm.edit = function(lista){
            console.log("llamando funcione edit", lista)
            $state.go('main.editList',{lista: lista})
        }

        vm.eliminar = function(id){
            console.log("llamando funcione eliminar", id)
            $http.post('/users/eliminar', {idlista: id})
                .then(function(responseOk){
                    console.log("datos brutos", responseOk)

                }, function(responseFail){
                    console.log("emptyyyy query", responseFail)
                })
        }

        vm.editarInfo = function(){
            console.log("editar info")
            var datos = lodash.mapKeys([{nombre: "nombreCambia", active: vm.nombreCambia}, {nombre: "emailCambia", active: vm.emailCambia}, {nombre: "passwordCambia", active: vm.passwordCambia}],function(o){ return o.active == true})

            console.log("enviando datos", datos)
            // $http.post('/users/editarInfo', campo)
            //     .then(function(responseOk){
            //         console.log(responseOk)
            //
            //     }, function(responseFail){
            //         console.log(responseFail)
            //     })
        }

        vm.cambia = function(cambia){
            switch(cambia){
                case 'nombre':
                    vm.nombreCambia = true
                    console.log("cambiuando nombre",vm.nombreCambia)
                    break;
                case 'email':
                    vm.emailCambia = true
                    console.log("cambiuando email",vm.emailCambia)
                    break;
                case 'password':
                    vm.passwordCambia = true
                    console.log("cambiuando password",vm.passwordCambia)
                    break;

            }
        }


        vm.abrir = function(){
            vm.abrirInput = true
        }

        vm.play = function(lista){
            //$rootScope.playlist = lista
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

    }

    angular.module('proyecto')
        .controller('mislistasCtrl',['$http','$auth','$state', '$rootScope','lodash','listas', 'favoritos', 'infoUsuario', mislistasCtrl]);

})();
