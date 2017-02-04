/**
 * Created by guzman on 4/02/17.
 */


(function() {
    function loginCtrl($http){
        var vm = this;
        vm.login = function(){

            /**
             * TODO: Llamada al servidor
             */
            // $http.get(
            //     url:'/'
            // )

        }
    }

    angular.module('proyecto')
        .controller('loginCtrl',['$http',loginCtrl]);

})();
