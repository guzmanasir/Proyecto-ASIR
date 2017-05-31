/**
 * Created by jesus on 21/05/17.
 */
(function() {
    function nuevosCtrl($http,$auth,$state,$rootScope, nuevos){
        console.log("entro en nuevos")
        var vm = this;
        vm.nuevos = nuevos.data.data.listas;
        console.log("nuevos" , vm.nuevos)

    }

    angular.module('proyecto')
        .controller('nuevosCtrl',['$http','$auth','$state', '$rootScope', 'nuevos', nuevosCtrl]);

})();
