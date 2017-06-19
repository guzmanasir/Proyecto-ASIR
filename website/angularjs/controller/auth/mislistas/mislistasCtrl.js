/**
 * Created by jesus on 21/05/17.
 */
(function() {
    function mislistasCtrl($http,$auth,$state,$rootScope, lodash,$stateParams,$mdDialog, listas, favoritos, infoUsuario){

        var vm = this;
        vm.paginaActual = $stateParams.pagina
        vm.paginaActual2 = $stateParams.pagina2
        vm.listas = listas.data.data.listas;
        vm.favoritos = favoritos.data.data.listas;
        console.log("mis favoritos", vm.listas)
        vm.infoUsuario = infoUsuario.data.data
        vm.totalListas = vm.listas[0].totalListas
        vm.totalFavoritos = vm.favoritos[0].totalListas
        vm.abrirInput = false
        vm.nombreCambia = false
        vm.emailCambia = false
        vm.passwordCambia = false
        console.log(listas)
        if($stateParams.tab == 1){
            vm.tab1 = true
            vm.tab2 = false
        } else {
            vm.tab1 = false
            vm.tab2 = true
        }
        vm.showConfirm = function(ev, id) {
            console.log("entrando en dialog")
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('¿Te gustaría eliminar esta lista?')
                .textContent('No podrás recuperarla en el futuro')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Si')
                .cancel('No');

            $mdDialog.show(confirm).then(function() {
                vm.eliminar(id,function(err,data){
                    if(!err){
                        if(vm.tab1){
                            var index = _.findIndex(vm.listas, {listaid: id})
                            vm.listas.splice(index,1)
                            vm.totalListas -= 1
                        }
                    }
                })

            }, function() {

            });
        };

        vm.edit = function(lista){
            console.log("llamando funcione edit", lista)
            $state.go('main.editList',{lista: lista})
        }

        vm.eliminar = function(id,cb){
            console.log("llamando funcione eliminar", id)
            $http.post('/users/eliminar', {idlista: id})
                .then(function(responseOk){
                    console.log("datos brutos", responseOk)
                    cb(null,[])

                }, function(responseFail){
                    console.log("emptyyyy query", responseFail)
                    cb(responseFail,null)
                })
        }

        vm.siguiente = function(pos,index){
            if(pos==1)
                $stateParams.pagina = index
            else
                $stateParams.pagina2 = index
            $state.go($state.current, {pagina: $stateParams.pagina, pagina2: $stateParams.pagina2, tab: pos }, {reload: true});
        }


        vm.nofavorito = function(listaid){
            vm.nofavoritoId = listaid
            lodash.find(vm.favoritos, {listaid: listaid}).isfavorited = false
            lodash.find(vm.favoritos, {listaid: listaid}).numfavoritos -= 1
            var index = _.findIndex(vm.favoritos, {listaid: listaid})
            vm.favoritos.splice(index,1)
            vm.totalFavoritos -= 1

            $http.post('/users/noFavorito', {noFavoritoId: vm.nofavoritoId})
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

        vm.abrir = function(){
            $state.go('main.editInfo',{datos: vm.infoUsuario})
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
        .controller('mislistasCtrl',['$http','$auth','$state', '$rootScope','lodash','$stateParams','$mdDialog','listas', 'favoritos', 'infoUsuario', mislistasCtrl]);

})();
