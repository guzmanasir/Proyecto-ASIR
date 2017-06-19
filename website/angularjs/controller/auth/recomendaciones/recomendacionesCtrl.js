/**
 * Created by jesus on 12/06/17.
 */

(function() {
    function recomendacionesCtrl($http,$auth,$state,$rootScope,lodash,  recomendadas){
        var vm = this;
        vm.artistas = recomendadas.data.data.artistas;
        vm.listas = recomendadas.data.data.listas
        vm.ids = lodash.uniq(lodash.map(vm.artistas, 'lista_idlista')).slice(0,4)
        //vm.recomendadas = [{artistas: [], listaparaPintar:{}},{}]
        vm.recomendadas = []
        lodash.forEach(vm.ids, function(item) {
            vm.recomendadas.push({artistas: lodash.map(lodash.filter(vm.artistas,{lista_idlista: item}), 'artista'),
            listas: lodash.filter(vm.listas.listas,{listaid: item})
            })
        })

        console.log("recomendaciones", vm.recomendadas)



    }


    angular.module('proyecto')
        .controller('recomendacionesCtrl',['$http','$auth','$state', '$rootScope','lodash', 'recomendadas', recomendacionesCtrl]);

})();
