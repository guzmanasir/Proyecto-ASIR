/**
 * Created by guzman on 4/02/17.
 */



(function() {
    function frameCtrl($http,$state,$auth, $mdDialog, lodash){
        var vm = this;
        vm.name = ""
        vm.cualquiera = "aa"
        vm.showAdvanced = function(ev) {
            $mdDialog.show({
                controller: function(){
                    var vmd = this;
                    vmd.urls = [];
                    vmd.tags = [];
                    vmd.page = "";
                    vmd.pagePrev = "";
                    vmd.pageNext = "";

                    vmd.answer = function(){
                        vm.name = vmd.nombre;
                        $mdDialog.hide();
                    }

                    vmd.close = function() {
                        $mdDialog.hide();
                    }

                    vmd.addUrl = function(obj) {

                        vmd.urls.push({
                            thumbnail: obj.snippet.thumbnails.default.url ,
                            url: "https://www.youtube.com/watch?v="+obj.id.videoId,
                            artista: obj.snippet.title.split("-")[0],
                            cancion: _.isUndefined(obj.snippet.title.split("-")[1]) ? "unknown" : obj.snippet.title.split("-")[1]
                        })
                        console.log(vmd.urls)
                    }



                    vmd.searchUrl = function(value , index) {

                        if(index === 0){
                            vmd.page = vmd.pagePrev;
                            console.log("Vale", vmd.page)
                            } else {
                                vmd.page = vmd.pageNext;
                                console.log("Vale2", vmd.page)
                            }

                        var key = 'AIzaSyBX1ayzZTlapJWNuhSYZRlkSUhU-NlOrCA'
                        var url = 'https://content.googleapis.com/youtube/v3/search?' +
                            '&key='+key+'&part=snippet&maxResults=6' +
                            '&q='+value+'&type=video' +
                            '&videoEmbeddable=true&pageToken='+vmd.page



                        $http.get(url).then(function (data) {

                            if(!data.data.prevPageToken){
                                vmd.pageNext = data.data.nextPageToken
                                vmd.firstPage = true
                                console.log("si no prev(primera)" )
                            } else {
                                 //vmd.page = (index == 0) ? data.data.prevPageToken : data.data.nextPageToken;
                                if(!data.data.prevPageToken){
                                    vmd.pageNext = data.data.nextPageTokenS

                                } else {
                                    vmd.pageNext = data.data.nextPageToken
                                    vmd.pagePrev = data.data.prevPageToken

                                }
                                console.log("si hay prev")
                                 console.log(vmd.page)
                                 vmd.firstPage = false
                            }
                            vmd.videoIds = data.data.items
                            data = {}
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
        .controller('frameCtrl',['$http','$state', '$auth','$mdDialog' , 'lodash', frameCtrl]);

})();
