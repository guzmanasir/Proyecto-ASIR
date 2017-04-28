/**
 * Created by guzman on 4/02/17.
 */



(function() {
    function loginCtrl($http,$auth,$state){
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
            $auth.login(json)
                .then(function(response){
                        if (response.data.codigo === 500)
                            swal(
                                'Oops...',
                                'Error al iniciar sesión',
                                'error'
                            )
                        else{
                            $state.go('main')
                        }

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
        .controller('loginCtrl',['$http','$auth','$state',loginCtrl]);

})();
