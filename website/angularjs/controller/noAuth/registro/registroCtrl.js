/**
 * Created by guzman on 4/02/17.
 */


(function() {
    function registroCtrl($http){
        var vm = this;
        vm.registro = function(){
            var json = {
                usernameRegistro : vm.usernameModel,
                passwordRegistro : vm.passwordModel,
                emailRegistro : vm.emailModel
            };

            $http.post('/registerForm',json)
                .then(function(response){
                        //console.log("respuesta",response);
                        vm.status = "OK";
                    },
                    function(response) {
                        vm.status = "Fallo";
                        console.log("fallo")
                        swal(
                            'Oops...',
                            'Error al registrar!',
                            'error'
                        )
                    });

        }
    }

    angular.module('proyecto')
        .controller('registroCtrl',['$http',registroCtrl]);

})();
