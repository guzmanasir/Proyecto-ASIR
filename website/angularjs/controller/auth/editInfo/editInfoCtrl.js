/**
 * Created by jesus on 19/06/17.
 */
(function() {
    function editInfoCtrl($http,$auth,$state,$rootScope, lodash, $stateParams, $mdToast){
        //console.log("stateparams ",$stateParams.datos)
        if(!$stateParams.datos)
            $state.go('main.perfil')
        var vm = this;

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

        vm.toastInfo = function(nombre) {
            var pinTo = vm.getToastPosition();
            //console.log("entro en toast")
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Tus nuevos datos se han guardado')
                    .position(pinTo )
                    .hideDelay(3000)
            );
        };

        vm.editInfo = $stateParams.datos
        //console.log("los datos", vm.editInfo)

        vm.editarInfo = function(){

            $http.post('/users/editarInfo', vm.editInfo)
                .then(function(responseOk){
                    //console.log(responseOk)

                    $state.go('main.perfil')
                    vm.toastInfo()
                }, function(responseFail){
                    //console.log(responseFail)
                })
        }

        vm.cancelar = function() {
            $state.go('main.perfil')
        }


    }

    angular.module('proyecto')
        .controller('editInfoCtrl',['$http','$auth','$state', '$rootScope','lodash','$stateParams', '$mdToast', editInfoCtrl]);

})();