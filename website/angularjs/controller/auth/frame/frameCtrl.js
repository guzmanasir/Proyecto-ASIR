/**
 * Created by guzman on 4/02/17.
 */



(function() {
    function frameCtrl($http,$state,$auth, $mdDialog){
        var vm = this;
        vm.name = ""
        vm.cualquiera = "aa"
        vm.showAdvanced = function(ev) {
            $mdDialog.show({
                controller: function(){
                    var vmd = this;
                    vmd.urls = [];
                    vmd.tags = [];

                    vmd.answer = function(){
                        vm.name = vmd.nombre;
                        $mdDialog.hide();
                    }

                    vmd.close = function() {
                        $mdDialog.hide();
                    }

                    vmd.addUrl = function(obj) {
                        vmd.urls.push({
                            url: vmd.url,
                            artista: "unknown",
                            cancion: "unknown"
                        })

                        vmd.url = "";
                    }

                    vmd.searchUrl = function(value) {

                        var q = url;
                        var key = 'AIzaSyC9I0Tx3qzCLnyqUdIx7jIBuw4OP4XA3yU'
                        var url = 'https://content.googleapis.com/youtube/v3/search?' +
                            '&key='+key+'&part=snippet' +
                            '&q='+value+'&type=video' +
                            '&videoEmbeddable=true'



                        $http.get(url).then(function (data) {
                            vmd.videoIds = data.data.items
                            console.info('videos from search by query', data);
                        },function(err){
                            console.error(err.data)
                        });

                    }



                    vm.urls = vmd.urls;
                    vm.tags = vmd.tags;

                },
                controllerAs: "mc",
                templateUrl: '/users/addListDialog',
                parent: angular.element(document.body),
                targetEvent: ev
                // clickOutsideToClose:true
            })
                .then(function() {
                    console.log("vm.name ",vm.name)
                    var dataList = {
                        nombreServer: vm.name,
                        tagsServer: vm.tags,
                        urlsServer: vm.urls
                    }
                    if(dataList.nombreServer != "" && dataList.tagsServer.length >= 1 && dataList.urlsServer.length >=1) {
                        $http.post('/users/addList', dataList)
                            .then(function(responseOk){
                                console.log(responseOk)
                            },function(responseFail){
                                console.error(responseFail);
                            })
                    }

                }, function() {
                    console.log("asdal");
                });
        };

    }

    angular.module('proyecto')
        .controller('frameCtrl',['$http','$state', '$auth','$mdDialog' , frameCtrl]);

})();
