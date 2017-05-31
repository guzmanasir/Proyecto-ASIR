/**
 * Created by jesus on 30/05/17.
 */
(function() {
    function editListCtrl($http,$auth,$state,$rootScope, $stateParams, $mdDialog, lodash){
        console.log("entreo aqui")
        var vm = this;
        vm.editList = $stateParams.lista
        if(lodash.isNull($stateParams.lista)) $state.go("main.mislistas")
        console.log("toda ls lista", $stateParams.lista)

        vm.eliminar = function(){
            vm.seleccionados = lodash.map(lodash.filter(vm.editList.info,function(o){return o.seleccionado == true}),'idenlace')
            lodash.remove(vm.editList.info, function(currentObject) {
                return currentObject.seleccionado === true;
            });
            console.log(vm.seleccionados)

            var edit = {idurls: vm.seleccionados, idlista: vm.editList.idlista}

            console.log("json", edit)

            $http.post('/users/editList', edit)
                .then(function(responseOk){
                    console.log(responseOk)
                },
                function(responseFail){
                    console.log(responseFail)
                })
        }

        vm.addNew = function(ev){
            $mdDialog.show({
                controller: function($mdDialog){
                    var vmd = this;
                    vmd.urls = [];
                    vmd.page = "";
                    vmd.pagePrev = "";
                    vmd.pageNext = "";
                    vmd.artista = "";
                    vmd.cancion = "";

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
                            '&key='+key+'&part=snippet&maxResults=3' +
                            '&q='+value+'&type=video' +
                            '&videoEmbeddable=true&pageToken='+vmd.page


                        console.log("primer then")
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
                },
                controllerAs: "eld",
                templateUrl: '/users/addSongDialog',
                parent: angular.element(document.body),
                targetEvent: ev,
                autoWrap: false,
                bindToController: true
            })
                .then(function() {

                    var dataList = {
                        urlsServer: vm.urls,
                        idlista: vm.editlist.idlista
                    }
                    if(dataList.urlsServer.length >=1) {
                        $http.post('/users/addSongs', dataList)
                            .then(function(responseOk){
                                console.log(responseOk)
                            },function(responseFail){
                                console.error(responseFail);
                            })
                    }

                }, function() {
                    console.log("asdal");
                });
        }






    }

    angular.module('proyecto')
        .controller('editListCtrl',['$http','$auth','$state', '$rootScope','$stateParams', '$mdDialog', 'lodash', editListCtrl]);

})();
