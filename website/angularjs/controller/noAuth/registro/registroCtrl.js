/**
 * Created by guzman on 4/02/17.
 */


(function() {
    function registroCtrl($http,$auth,$state){
        var vm = this;
        vm.registro = function(){
            var json = {
                usernameRegistro : vm.usernameModel,
                passwordRegistro : vm.passwordModel,
                emailRegistro : vm.emailModel
            };

            $http.post('/registerForm',json)
                .then(function(response){
                        ////console.log("respuesta",response);
                        vm.status = "OK";
                        var login = {
                            usernameServer : json.usernameRegistro,
                            passwordServer : json.passwordRegistro
                        }
                        $auth.login(login)
                            .then(function(response) {
                                    //console.log("entro en redi")
                                    $state.go('main.home')
                                },
                                function(response) {
                                    swal(
                                        'Oops...',
                                        'Su usuario o contraseña son incorrectos',
                                        'error'
                                    )
                                    $rootScope.$emit("Loginfail",response)

                                });
                    },
                    function(response) {
                        vm.status = "Fallo";
                        //console.log("fallo")
                        swal(
                            'Oops...',
                            'Error al registrar! El usuario o email ya existen',
                            'error'
                        )
                    });

        }
    }

    angular.module('proyecto')
        .controller('registroCtrl',['$http',"$auth","$state",registroCtrl]);

})();
