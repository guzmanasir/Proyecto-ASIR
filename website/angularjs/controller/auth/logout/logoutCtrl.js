/**
 * Created by jesus on 18/05/17.
 */
(function() {
    function logoutCtrl($http,$state,$auth){
        var vm = this;
        $auth.logout()
        $state.go('home.login')



    }

    angular.module('proyecto')
        .controller('logoutCtrl',['$http','$state', '$auth', logoutCtrl]);

})();
