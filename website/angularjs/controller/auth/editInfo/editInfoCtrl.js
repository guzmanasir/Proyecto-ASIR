/**
 * Created by jesus on 19/06/17.
 */
(function() {
    function editInfoCtrl($http,$auth,$state,$rootScope, lodash, $stateParams){
        console.log("stateparams ",$stateParams.datos)
        if(!$stateParams.datos)
            $state.go('main.perfil')
        var vm = this;

        vm.editInfo = $stateParams.datos
        console.log("los datos", vm.editInfo)

        vm.editarInfo = function(){

            $http.post('/users/editarInfo', vm.editInfo)
                .then(function(responseOk){
                    console.log(responseOk)
                    $state.go('main.perfil')
                }, function(responseFail){
                    console.log(responseFail)
                })
        }


    }

    angular.module('proyecto')
        .controller('editInfoCtrl',['$http','$auth','$state', '$rootScope','lodash','$stateParams', editInfoCtrl]);

})();