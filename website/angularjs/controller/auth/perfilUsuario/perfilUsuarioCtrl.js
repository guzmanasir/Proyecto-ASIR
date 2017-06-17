/**
 * Created by jesus on 17/06/17.
 */
(function() {
    function perfilUsuarioCtrl($http,$auth,$state,$rootScope, lodash, listas){
        var vm = this;
        console.log("entrando en perfil", listas)
        vm.listas = listas.data.data.listas;


    }

    angular.module('proyecto')
        .controller('perfilUsuarioCtrl',['$http','$auth','$state', '$rootScope','lodash','listas', perfilUsuarioCtrl]);

})();