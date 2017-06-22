/**
 * Created by guzman on 4/02/17.
 */



(function() {
    function frameCtrl($http,$state,$auth, $mdDialog, $mdToast, lodash, tags , $rootScope, $scope, infoUsuario ) {
        var vm = this;
        vm.name = ""
        vm.infoUsuario = infoUsuario
        console.log("INFO USUARIO",vm.infoUsuario)
        $rootScope.infoUsuario = vm.infoUsuario.data.data

        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        vm.toastPosition = angular.extend({},last);

        vm.getToastPosition = function() {
            sanitizePosition();

            return Object.keys(vm.toastPosition)
                .filter(function(pos) { return vm.toastPosition[pos]; })
                .join(' ');
        };

        function sanitizePosition() {
            var current = vm.toastPosition;

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;

            last = angular.extend({},current);
        }

        vm.toastAddList = function(nombre) {
            var pinTo = vm.getToastPosition();
            //console.log("entro en toast")
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Has añadido la lista "' + nombre + '" con éxito')
                    .position(pinTo )
                    .hideDelay(3000)
            );
        };


        //console.log("tags", tagCloud.data.data)
        //console.log("words", vm.words)
        vm.showAdvanced = function (ev) {
            $mdDialog.show({
                controller: function ($mdDialog) {
                    var vmd = this;
                    vmd.allTags = tags.data.data
                    vmd.urls = [];
                    vmd.tagsSelected = [];
                    vmd.page = "";
                    vmd.pagePrev = "";
                    vmd.pageNext = "";
                    vmd.artista = "";
                    vmd.cancion = "";



                    vmd.createFilterFor = function (query) {

                        var lowercaseQuery = angular.lowercase(query);
                        //console.log("lower", lowercaseQuery)

                        return function filterFn(contact) {
                            ////console.log("tagsSelected ",tagsSelected)
                            return (contact.nombre.indexOf(lowercaseQuery) !== -1);
                        };

                    }


                    vmd.filter = function (criteria) {
                        //console.log(criteria)
                        //return criteria ? vmd.allTags.filter(createFilterFor(criteria)) : [];
                        return criteria ? vmd.allTags.filter(vmd.createFilterFor(criteria)) : [];

                    }


                    vmd.answer = function () {
                        vm.compru = true
                        vm.name = vmd.nombre;
                        $mdDialog.hide();
                    }

                    vmd.close = function () {
                        vm.compru = false
                        $mdDialog.hide();
                    }

                    vmd.addUrl = function (obj) {
                        var aux = {
                            thumbnail: obj.snippet.thumbnails.default.url,
                            url: "https://www.youtube.com/watch?v=" + obj.id.videoId,
                            artista: obj.snippet.title.split("-")[0],
                            cancion: _.isUndefined(obj.snippet.title.split("-")[1]) ? "unknown" : obj.snippet.title.split("-")[1]
                        }

                        var check = false
                        lodash.forEach(vm.urls,function(o){ if(lodash.isEqual(aux,o)) check=true })
                        if(!check)
                            vmd.urls.push(aux)
                        //console.log(vmd.urls)
                    }


                    vmd.editSong = function (index) {
                        $mdDialog.show({
                            controller: function () {
                                var vme = this;
                                vme.artista = vmd.urls[index].artista
                                vme.cancion = vmd.urls[index].cancion
                                vme.save = function () {
                                    vmd.urls[index].artista = vme.artista
                                    vmd.urls[index].cancion = vme.cancion
                                    $mdDialog.hide();
                                }

                                vme.close = function () {
                                    $mdDialog.hide();
                                }
                            },
                            multiple: true,
                            controllerAs: "mc",
                            templateUrl: '/users/editSongDialog.jade',
                            preserveScope: true,
                            skipHide: true

                        })

                    }


                    vmd.searchUrl = function (value, index) {

                        if (index === 0) {
                            vmd.page = vmd.pagePrev;
                            //console.log("Vale", vmd.page)
                        } else if (index === 1) {
                            vmd.page = vmd.pageNext;
                            //console.log("Vale2", vmd.page)
                        } else {
                            vmd.page = ""
                        }

                        var key = 'AIzaSyBX1ayzZTlapJWNuhSYZRlkSUhU-NlOrCA'
                        var url = 'https://content.googleapis.com/youtube/v3/search?' +
                            '&key=' + key + '&part=snippet&maxResults=3' +
                            '&q=' + value + '&type=video' +
                            '&videoEmbeddable=true&videoSyndicated=true&pageToken=' + vmd.page


                        //console.log("primer then")
                        $http.get(url).then(function (data) {

                            if (!data.data.prevPageToken) {
                                vmd.pageNext = data.data.nextPageToken
                                vmd.firstPage = true
                                //console.log("si no prev(primera)")
                            } else {
                                //vmd.page = (index == 0) ? data.data.prevPageToken : data.data.nextPageToken;
                                if (!data.data.prevPageToken) {
                                    vmd.pageNext = data.data.nextPageTokenS

                                } else {
                                    vmd.pageNext = data.data.nextPageToken
                                    vmd.pagePrev = data.data.prevPageToken

                                }
                                //console.log("si hay prev")
                                //console.log(vmd.page)
                                vmd.firstPage = false
                            }
                            vmd.videoIds = data.data.items
                            data = {}
                            console.info('videos from search by query', data);
                        }, function (err) {
                            console.error(err.data)
                        });

                    }
                    vm.close = function() {
                        $mdDialog.hide();
                    }

                    vm.urls = vmd.urls;
                    vm.tags = vmd.tagsSelected
                    //vm.tags = lodash.map(vmd.tagsSelected, "idetiquetas")

                },
                controllerAs: "mc",
                templateUrl: '/users/addListDialog',
                parent: angular.element(document.body),
                targetEvent: ev,
                autoWrap: false,
                bindToController: true
                // clickOutsideToClose:true
            })
                .then(function () {
                    var dataList = {
                        nombreServer: vm.name,
                        tagsServer: vm.tags,
                        urlsServer: vm.urls
                    }
                    console.log("entro aqui 2", dataList)

                    //console.log(dataList.tagsServer)
                    if (dataList.nombreServer != "" && dataList.tagsServer.length >= 1 && dataList.urlsServer.length >= 1) {
                        $http.post('/users/addList', dataList)
                            .then(function (responseOk) {

                                vm.close()
                                vm.toastAddList(dataList.nombreServer)
                                //console.log(responseOk)
                            }, function (responseFail) {
                                console.error(responseFail);
                            })
                    } else if (vm.compru) {
                        //console.log("el compru", vm.compru)
                        console.log("entro",vm.compru)
                        swal(
                            'Oops...',
                            'Error al registrar la lista. Rellene el campo de nombre, añada etiqueta y enlaces!',
                            'error'
                        )
                    }

                }, function () {
                    console.log("entro aqui")
                    //console.log("asdal");
                });
        };
        vm.playerVars = {autoplay: 1}
        vm.player = ""
        vm.idVideo="null"
        vm.youtube=false;
        vm.abrirBusqueda = false;
        vm.reproduciendo = ""
        vm.actualNavItem=$rootScope.estadoActual
        //console.log("la tab", vm.actualNavItem)

        //vm.index = 0
        $scope.$on('youtube.player.ready', function (event, player) {
            //console.log("el reproductor esta listo");
            vm.player = player
        })
        $scope.$on('playlist', function (event, lista) {

            vm.playlist = lista;
            //vm.reproduciendo = lista[vm.index].artista + "-" + lista[vm.index].cancion

            vm.idVideos = lodash.map(vm.playlist, function(o){
                return o.url.split("=")[1]
            })
            //console.log("idvideos",vm.idVideos)
            // vm.idVideos = vm.playlist[0].url.split("=")[1]
            vm.youtube=true;
            vm.player.loadPlaylist({playlist: vm.idVideos})
            //vm.index = vm.player.getPlaylistIndex()



        })

        $scope.$on('youtube.player.playing', function(event, player){
                //vm.index = player.getPlaylistIndex()
            vm.artista = vm.playlist[player.getPlaylistIndex()].artista.trim()
            vm.cancion = vm.playlist[player.getPlaylistIndex()].cancion.trim()
            var url = "/users/lyrics?artista="+vm.artista+"&cancion="+vm.cancion
            $http.get(url)
                .then(function(responseOk){
                    console.log("letraok", responseOk)
                    vm.letra = (!responseOk.data.data) ? "No hay letra para esta cancion" : responseOk.data.data
                },function(responseFail){
                    console.log("letrafail")
                    vm.letra = "No hay letra para esta cancion"
                })

            vm.reproduciendo = vm.artista + " - " + vm.cancion


        })

        // vm.buscar = function(){
        //     //console.log("%"+vm.busqueda+"%")
        //
        //     var buscador = {tipo: vm.type, busqueda: "%"+vm.busqueda+"%" }
        //
        //      $http.post('/users/search/', buscador)
        //          .then(function(responseOk){
        //              //console.log("datos brutos", responseOk)
        //              //console.log("datos busqueda", responseOk.data.data.listas)
        //              $state.go('main.buscador', {resultado: responseOk.data.data.listas})
        //
        //          }, function(responseFail){
        //              //console.log("emptyyyy query", responseFail)
        //          })
        // }

        vm.cambiarNav = function(){
            $state.go('main.nuevos', {pagina: 1})
        }

        vm.abrirBuscar = function(){
            vm.abrirBusqueda = true;
        }
        vm.cerrarBuscar = function(){
            vm.abrirBusqueda = false;
            vm.busqueda = "";
        }
    }

    angular.module('proyecto')
        .controller('frameCtrl', ['$http', '$state', '$auth', '$mdDialog', '$mdToast', 'lodash', 'tags', '$rootScope', '$scope', 'infoUsuario', frameCtrl]);

})();