/**
 * Created by jesus on 11/06/17.
 */
(function() {
    function verlistaCtrl($http,$auth,$state,$rootScope, $stateParams, $mdDialog, lodash){
        //if(lodash.isNull($stateParams.lista)) return $state.go("main.mislistas")
        console.log("entreo aqui")
        var vm = this;
        vm.verLista = $stateParams.lista
        console.log("toda ls lista", $stateParams.lista)




    }

    angular.module('proyecto')
        .controller('verlistaCtrl',['$http','$auth','$state', '$rootScope','$stateParams', '$mdDialog', 'lodash', verlistaCtrl]);

})();
