/**
 * Created by guzman on 4/02/17.
 */


(function() {
    function loginCtrl($http){
        var vm = this;
        vm.login = function(){

            console.log("Info login", vm.username, vm.password)
            /**
             * TODO: Llamada al servidor
             */
            var json = {
                username : vm.username,
                password : vm.password
            };

            $http.post('/loginForm',json)
                .then(function(response){
                        console.log("respuesta",response);
                        vm.status = "OK";

                    },
                    function(response) {
                        vm.status = "Fallo";

                    });
        }
    }

    angular.module('proyecto')
        .controller('loginCtrl',['$http',loginCtrl]);

})();
