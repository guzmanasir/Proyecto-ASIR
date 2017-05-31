/**
 * Created by jesus on 30/05/17.
 */
(function() {
    function editListCtrl($http,$auth,$state,$rootScope, $stateParams,lodash){
        console.log("entreo")
        var vm = this;
        vm.editList = $stateParams.lista
        if(lodash.isNull($stateParams.lista)) $state.go("main.mislistas")
        console.log($stateParams.lista)

        vm.eliminar = function(){
            var seleccionados = lodash.map(lodash.filter(vm.editList.info,function(o){return o.seleccionado == true}),'idenlace')
            lodash.remove(vm.editList.info, function(currentObject) {
                return currentObject.seleccionado === true;
            });
            console.log(seleccionados)
        }


    }

    angular.module('proyecto')
        .controller('editListCtrl',['$http','$auth','$state', '$rootScope','$stateParams', 'lodash', editListCtrl]);

})();
