/**
 * Created by guzman on 4/02/17.
 */



(function() {
    function frameCtrl($http,$state,$auth, $mdDialog){
        var vm = this;
        vm.showAdvanced = function(ev) {
            $mdDialog.show({
                controller: function(){
                    var vmd = this;
                    vmd.answer = function(){
                        $mdDialog.hide();
                    }
                    vmd.tags = [];
                    vm.tags = vmd.tags;

                },
                controllerAs: "mc",
                templateUrl: '/users/addListDialog',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
                .then(function(answer) {
                    console.log("tags",vm.tags)


                }, function() {
                    console.log("asdal")
;                });
        };

    }

    angular.module('proyecto')
        .controller('frameCtrl',['$http','$state', '$auth','$mdDialog', frameCtrl]);

})();
