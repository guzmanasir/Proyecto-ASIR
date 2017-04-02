/**
 * Created by guzman on 4/02/17.
 */


(function() {
    function loginCtrl($http){
        var vm = this;
        vm.login = function(){

            console.log("Info login", vm.usernameModel, vm.passwordModel)
            /**
             * TODO: Llamada al servidor
             */
            var json = {
                usernameServer : vm.usernameModel,
                passwordServer : vm.passwordModel
            };

            $http.post('/loginForm',json)
                .then(function(response){
                        if (response.data.codigo === 500)
                            swal(
                                'Oops...',
                                'Error al iniciar sesión',
                                'error'
                            )
                        else
                            swal(
                                ' ',
                                'Has iniciado sesion',
                                'success'
                            )
                        console.log("respuesta",response);
                        vm.status = "OK";

                    },
                    function(response) {
                        swal(
                            'Oops...',
                            'Error de servidor',
                            'error'
                        )

                    });
        }
    }

    angular.module('proyecto')
        .controller('loginCtrl',['$http',loginCtrl]);

})();
