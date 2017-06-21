var express = require('express');
var router = express.Router();
var middlewareToken = require('../../../private/middleware/middlewareToken')
var codigos = require('../../../private/utils/codewrapper');
var _ = require('lodash')
var query = require('../mysql/queries');
var async = require('async')

router.use(middlewareToken.middlewareToken);

/**
 * Rutas para renderizar templates
 */

router.get('/frame', function(req, res, next) {
    res.render('angularjs/controller/auth/frame/frame')
});

router.get('/index', function(req, res, next) {
    res.render('angularjs/controller/auth/index/index')
});

router.get('/tempNuevos', function(req, res, next) {
    res.render('angularjs/controller/auth/nuevos/nuevos')
});

router.get('/tempPopulares', function(req, res, next) {
    res.render('angularjs/controller/auth/populares/populares')
});


router.get('/addListDialog', function(req, res, next) {
    res.render('angularjs/controller/auth/frame/addListDialog')
});

router.get('/editSongDialog.jade', function(req, res, next) {
    res.render('angularjs/controller/auth/frame/editSongDialog.jade')
});

router.get('/songEditDialog', function(req, res, next) {
    res.render('angularjs/controller/auth/editList/songEditDialog')
});

router.get('/addSongDialog', function(req, res, next) {
    res.render('angularjs/controller/auth/editList/addSongDialog')
});


router.get('/tempMisListas', function(req, res, next) {
    res.render('angularjs/controller/auth/mislistas/mislistas')
});

router.get('/tempNuevos', function(req, res, next) {
    res.render('angularjs/controller/auth/nuevos/nuevos')
});

router.get('/tempFavoritos', function(req, res, next) {
    res.render('angularjs/controller/auth/favoritos/favoritos')
});

router.get('/tempEditList', function(req, res, next) {
    res.render('angularjs/controller/auth/editList/editList')
});

router.get('/tempVerLista', function(req, res, next) {
    res.render('angularjs/controller/auth/verLista/verlista')
});

router.get('/tempBuscador', function(req, res, next) {
    res.render('angularjs/controller/auth/buscador/buscador')
});

router.get('/tempPopulares', function(req, res, next) {
    res.render('angularjs/controller/auth/populares/populares')
});

router.get('/tempRecomendaciones', function(req, res, next) {
    res.render('angularjs/controller/auth/recomendaciones/recomendaciones')
});

router.get('/tempHome', function(req, res, next) {
    res.render('angularjs/controller/auth/home/home')
});

router.get('/tempPerfilUsuario', function(req, res, next) {
    res.render('angularjs/controller/auth/perfilUsuario/perfilUsuario')
});

router.get('/tempEditInfo', function(req, res, next) {
    res.render('angularjs/controller/auth/editInfo/editInfo')
});


/**
 * Ruta para insertar listas
 */

router.post('/addList', function(req, res, next){
    var json = req.body;
    json.id = req.idUser;
    if ( !json.id || json.id <= 0 || _.isUndefined(json.nombreServer)
        || _.isUndefined(json.tagsServer)
        || _.isUndefined(json.urlsServer)
        || json.nombreServer == "")
        return codigos.responseFail(res,10010)
    ////console.log(json);

    query.addList(json, function(err,resultado){
        if(err) return codigos.responseFail(res, err)
        //console.log(resultado)
        codigos.responseOk(res, json)

    })
})

/**
 *
 */

router.post('/addSongs', function(req, res, next){
    var json = req.body;
    json.id = req.idUser;
    if ( _.isUndefined(json.urlsServer))
        return codigos.responseFail(res,10010)
    ////console.log(json);

    query.addSongs(json, function(err,resultado){
        if(err) return codigos.responseFail(res, err)
        //console.log(resultado)
        codigos.responseOk(res, json)

    })
})

router.post('/editList', function(req, res, next) {
    var json = req.body
    // aqui query

    query.editList(json,function(err,resultados){
        if(err){
            return codigos.responseFail(res, err);
        }
        if(resultados.length !== 1)
            return codigos.responseFail(res, 500)
        else {
            var token = {token:serviceToken.createToken(resultados[0])}
            res.status(200).json(token)
        }
    })
});



router.post('/songEdit', function(req, res, next) {
    var json = req.body
    //console.log("json pa edita loco", json)
    // aqui query

    query.editSong(json,function(err,resultados){
        if(err){
            return codigos.responseFail(res, err);
        } else {
            codigos.responseOk(res)

        }
    })
});

router.post('/search/:pagina', function(req, res, next) {
    var json = req.body
    //console.log("json pa edita loco", json)
    //console.log("PAGINA VALE ",req.params.pagina)
    //console.log("LIMITE VALE ",req.params.limite)
    var limit = ""
    var offset = ""
    if((req.params.pagina && parseInt(req.params.pagina)-1 < 0) || (req.params.limite && parseInt(req.params.limite)-1 < 0)  ){
        limit = 9
        offset = 0
        //console.log("entroe en el primero")
    } else {

        if(req.params.pagina && req.params.limite){
            limit = req.params.limite
            offset = (parseInt(req.params.pagina)-1) * req.params.limite
            //console.log("entroe en el segundo")

        }else if(req.params.pagina){
            limit = 9
            offset = (parseInt(req.params.pagina)-1) * limit
            //console.log("entroe en el tercero")

        }else{
            limit = 9
            offset = 0
            //console.log("entroe en el cuarto")

        }
    }

    //console.log("limit ", req.params.limit)
    //console.log("offset ", req.params.pagina)
    var valuesPagina = {limit: limit, offset: offset, busqueda: json.busqueda, tipo: json.tipo, ordenar: json.ordenar, idtag: json.idtag}

    //console.log("ENTRO valuespagiina", valuesPagina)

    query.buscador(valuesPagina,function(err,resultados){
        if(err) return codigos.responseFail(res, err);

        if (!_.isEmpty(resultados.idlista)) {
            //console.log("valores brutos del buscador", resultados)
            var idlistas = resultados.idlista
            var total = resultados.total
            var idUser = req.idUser
            //console.log("los valores del buscador", idlistas, " ", total, " ", idUser)
            getInfoList(idlistas, total, idUser, valuesPagina.ordenar, idUser, function(err, data){

                if(err) return codigos.responseFail(res,err)
                //console.log("RESULTAOS FINALES", data)

                codigos.responseOk(res, data)

            })
        } else {
            codigos.responseOk(res, [])
        }


    })


});


router.post('/favorito', function(req, res, next) {

    var json = {favoritoId: req.body.favoritoId, idUser: req.idUser}
    // aqui query
    //console.log("datos favorito", json)

    query.favorito(json,function(err,resultados){
        if(err){
            return codigos.responseFail(res, err);
        }
        else {
            codigos.responseOk(res)
        }
    })
});

router.post('/reproduccion', function(req, res, next) {
    var idGlobal = req.idUser
    var json = {listaId: req.body.listaid}
    // aqui query
    //console.log("datos favorito", json)

    query.reproduccion(json,function(err,resultados){
        if(err){
            return codigos.responseFail(res, err);
        }
        else {
            codigos.responseOk(res)
        }
    })
});

router.post('/noFavorito', function(req, res, next) {

    var json = {favoritoId: req.body.noFavoritoId, idUser: req.idUser}
    // aqui query
    //console.log("datos No favorito", json)

    query.noFavorito(json,function(err,resultados){
        if(err){
            return codigos.responseFail(res, err);
        }
        else {
            codigos.responseOk(res)
        }
    })
});



router.post('/editarInfo', function(req, res, next) {
    var json = req.body
    json.idUser = req.idUser
    // aqui query
    //console.log("datos No favorito", json)

    query.editarInfo(json,function(err,resultados){
        if(err){
            return codigos.responseFail(res, err);
        }
        else {
            codigos.responseOk(res)
        }
    })
});




/**
 * Obtiene lista de listas a partir de un id de usuario
 */
router.get('/getLists/:pagina', function(req, res, next) {
    var id = req.idUser;
    var limit = ""
    var offset = ""
    //console.log("entro en getlist")
    if((req.params.pagina && parseInt(req.params.pagina)-1 < 0) || (req.params.limite && parseInt(req.params.limite)-1 < 0)  ){
        limit = 9
        offset = 0
        //console.log("entroe en el primero")
    } else {

        if(req.params.pagina && req.params.limite){
            limit = req.params.limite
            offset = (parseInt(req.params.pagina)-1) * req.params.limite
            //console.log("entroe en el segundo")

        }else if(req.params.pagina){
            limit = 9
            offset = (parseInt(req.params.pagina)-1) * limit
            //console.log("entroe en el tercero")

        }else{
            limit = 9
            offset = 0
            //console.log("entroe en el cuarto")

        }
    }

    //console.log("limit ", req.params.limit)
    //console.log("offset ", req.params.pagina)
    var valuesPagina = {limit: limit, offset: offset, id: id}
    getListById(valuesPagina, function(err,data){
        if(err) return codigos.responseFail(res,err)
        var idlistas = data.idlista
        var total = data.total
        getInfoList(idlistas, total, id, 'l.fecha', id, function(err,data){
            if(err) return codigos.responseFail(res,err)

            codigos.responseOk(res, data)
        })

    })


});

function getFavoritosById(values, callback){

    //console.log("values en la funcion", values)

    query.favoritos(values, function(err,resultado){

        if(err) return callback(err, null)
        ////console.log("resultado ",resultado)

        //console.log("resultao sin total", resultado)

        callback(null, resultado)

    })
}



function getListById(values, callback){



    query.getList(values, function(err,resultado){

        if(err) return callback(err, null)
        ////console.log("resultado ",resultado)

        //console.log("resultao sin total", resultado)

        callback(null, resultado)

    })
}

router.get('/recomendacionesQuery', function(req, res, next) {
    var id = req.idUser;
    // var result = {
    //     total: [{nombre:'lista1', urls: [], tags : []}]
    // }

    query.recomendaciones(id, function(err, resultado){
        if(err) return codigos.responseFail(res, err)
        var idlistas = _.uniq(_.map(resultado,'lista_idlista'),'lista_idlista')
        getInfoList(idlistas, 9, id, 'l.fecha', id, function(err,data){
            if(err) return codigos.responseFail(res,err)
            var recomendaciones = {listas: data, artistas: resultado}
            codigos.responseOk(res, recomendaciones)
        })
    })


});

router.get('/infoUsuario', function(req, res, next) {
    var id = req.idUser;
    // var result = {
    //     total: [{nombre:'lista1', urls: [], tags : []}]
    // }

    query.infoUsuario(id, function(err, resultado){
        if(err) return codigos.responseFail(res, err)
        ////console.log(resultado)
        codigos.responseOk(res, resultado[0])
    })


});

router.get('/misFavoritos/:pagina', function(req, res, next) {
    var id = req.idUser;
    var limit = ""
    var offset = ""
    //console.log("entro en getlist")
    if((req.params.pagina && parseInt(req.params.pagina)-1 < 0) || (req.params.limite && parseInt(req.params.limite)-1 < 0)  ){
        limit = 9
        offset = 0
        //console.log("entroe en el primero")
    } else {

        if(req.params.pagina && req.params.limite){
            limit = req.params.limite
            offset = (parseInt(req.params.pagina)-1) * req.params.limite
            //console.log("entroe en el segundo")

        }else if(req.params.pagina){
            limit = 9
            offset = (parseInt(req.params.pagina)-1) * limit
            //console.log("entroe en el tercero")

        }else{
            limit = 9
            offset = 0
            //console.log("entroe en el cuarto")

        }
    }

    //console.log("limit ", req.params.limit)
    //console.log("offset ", req.params.pagina)
    var valuesPagina = {limit: limit, offset: offset, id: id}

    getFavoritosById(valuesPagina, function(err,data){
        if(err) return codigos.responseFail(res,err)
        var idlistas = data.idlista
        var total = data.total
        getInfoList(idlistas, total, id, 'l.fecha', id, function(err,data){
            if(err) return codigos.responseFail(res,err)

            codigos.responseOk(res, data)
        })
    })

});

router.get('/otrosFavoritos/:idUser/:pagina', function(req, res, next) {
    var id = req.params.idUser;

    var limit = ""
    var offset = ""
    //console.log("entro en getlist")
    if((req.params.pagina && parseInt(req.params.pagina)-1 < 0) || (req.params.limite && parseInt(req.params.limite)-1 < 0)  ){
        limit = 9
        offset = 0
        //console.log("entroe en el primero")
    } else {

        if(req.params.pagina && req.params.limite){
            limit = req.params.limite
            offset = (parseInt(req.params.pagina)-1) * req.params.limite
            //console.log("entroe en el segundo")

        }else if(req.params.pagina){
            limit = 9
            offset = (parseInt(req.params.pagina)-1) * limit
            //console.log("entroe en el tercero")

        }else{
            limit = 9
            offset = 0
            //console.log("entroe en el cuarto")

        }
    }

    //console.log("limit ", req.params.limit)
    //console.log("offset ", req.params.pagina)
    var valuesPagina = {limit: limit, offset: offset, id: id}

    getFavoritosById(valuesPagina, function(err,data){
        if(err) return codigos.responseFail(res,err)
        var idlistas = data.idlista
        var total = data.total
        var myId = req.idUser
        getInfoList(idlistas, total, id, 'l.fecha', myId, function(err,data){
            if(err) return codigos.responseFail(res,err)

            codigos.responseOk(res, data)
        })
    })

});

function getInfoList(idlistas, total, idUser, order, myId, callback){


    if(idlistas.length<1)
        return callback(null,[])
    var values = {idlistas: idlistas, order: order}
    query.getByIdlist(values, function(err,resultado){


        if(err) return callback(err, null)
        ////console.log("resultado la query de las mierdi listas",resultado)
        var nuevos = {listas : [
        ]}
        var index = 0
        var idListas = _.map(_.uniqBy(resultado,'idlista' ),'idlista')
        //console.log("los ids pa las nuevas", idListas)

        async.each(idListas, function(item,cb){
            nuevos.listas.push({nombre:_.uniq( _.map(_.filter(resultado,function(o){return o.idlista == item}),'listanombre'))[0],
                listaid: item,
                isfavorited: false,
                totalListas: total,
                nombreUsuario: _.uniq( _.map(_.filter(resultado,function(o){return o.idlista == item}),'nombreUsuario'))[0],
                miusuarioid: myId,
                numfavoritos:_.uniq( _.map(_.filter(resultado,function(o){return o.idlista == item}),'numerofavorito'))[0] ,
                numreproducciones: _.uniq( _.map(_.filter(resultado,function(o){return o.idlista == item}),'reproducciones'))[0],
                usuarioid: _.uniq( _.map(_.filter(resultado,function(o){return o.idlista == item}),'usuario_id'))[0],
                fecha: _.uniq( _.map(_.filter(resultado,function(o){return o.idlista == item}),'fecha'))[0],
                //urls:[_.uniq(_.map(_.filter(resultado,function(o){return o.listanombre == item}),'URL'))],
                info:[],
                tags:_.uniq(_.map(_.filter(resultado,function(o){return o.idlista == item}),'nombre'))}
            )
            ////console.log("antes de url")

            var urls = _.uniqBy(_.filter(resultado,function(o){return o.idlista == item}),'URL')
            _.forEach(urls, function(item2){
                nuevos.listas[index].info.push({url: item2.URL,
                    artista: item2.artista,
                    cancion: item2.cancion,
                    thumbnail: item2.thumbnail,
                    idenlace: item2.idenlace
                })
            })
            index++
            ////console.log("urls nuevos",urls)
            cb()

        },function(err,data){

            var values = {id: myId, limit: total, offset: 0 }



            query.favoritos(values, function(err, resultado){
                if(err) return callback(err, null)
                //console.log("resultados ids fav", resultado)
                var idFavoritos = resultado.idlista
                //console.log("idsfavoritossss", idFavoritos)
                _.forEach(idFavoritos, function(item){
                    if(!_.isUndefined(_.find(nuevos.listas, {listaid: item})))
                        _.find(nuevos.listas, {listaid: item}).isfavorited = true


                })

                ////console.log("nuevos", nuevos)
                callback(null, nuevos)
            })

        })




    })
}

router.get('/newLists/:pagina?/:limite*?', function(req, res, next) {
    // var result = {
    //     total: [{nombre:'lista1', urls: [], tags : []}]
    // }
    //console.log("PAGINA VALE ",req.params.pagina)
    //console.log("LIMITE VALE ",req.params.limite)
    var limit = ""
    var offset = ""
    if((req.params.pagina && parseInt(req.params.pagina)-1 < 0) || (req.params.limite && parseInt(req.params.limite)-1 < 0)  ){
        limit = 9
        offset = 0
        //console.log("entroe en el primero")
    } else {

        if(req.params.pagina && req.params.limite){
            limit = req.params.limite
            offset = (parseInt(req.params.pagina)-1) * req.params.limite
            //console.log("entroe en el segundo")

        }else if(req.params.pagina){
            limit = 9
            offset = (parseInt(req.params.pagina)-1) * limit
            //console.log("entroe en el tercero")

        }else{
            limit = 9
            offset = 0
            //console.log("entroe en el cuarto")

        }
    }

    //console.log("limit ", req.params.limit)
    //console.log("offset ", req.params.pagina)
    var valuesPagina = {limit: limit, offset: offset}

    //console.log("ENTRO")
    query.newLists(valuesPagina, function(err,resultado){
        if(err) return codigos.responseFail(res, err)

        var idlistas = resultado.idlista
        var total = resultado.total
        var idUser = req.idUser

        getInfoList(idlistas, total, idUser, 'l.fecha DESC', idUser, function(err, data){

            if(err) return codigos.responseFail(res,err)
            //console.log("RESULTAOS FINALES", data)

            codigos.responseOk(res, data)

        })

    })



});

router.get('/populares', function(req, res, next) {
    // var result = {
    //     total: [{nombre:'lista1', urls: [], tags : []}]
    // }
    //console.log("PAGINA VALE ",req.params.pagina)
    //console.log("LIMITE VALE ",req.params.limite)
    var limit = ""
    var offset = ""
    if((req.params.pagina && parseInt(req.params.pagina)-1 < 0) || (req.params.limite && parseInt(req.params.limite)-1 < 0)  ){
        limit = 9
        offset = 0
        //console.log("entroe en el primero")
    } else {

        if(req.params.pagina && req.params.limite){
            limit = req.params.limite
            offset = (parseInt(req.params.pagina)-1) * req.params.limite
            //console.log("entroe en el segundo")

        }else if(req.params.pagina){
            limit = 9
            offset = (parseInt(req.params.pagina)-1) * limit
            //console.log("entroe en el tercero")

        }else{
            limit = 9
            offset = 0
            //console.log("entroe en el cuarto")

        }
    }

    //console.log("limit ", req.params.limit)
    //console.log("offset ", req.params.pagina)
    var valuesPagina = {limit: limit, offset: offset}

    //console.log("ENTRO")
    query.populares(valuesPagina, function(err,resultado){
        if(err) return codigos.responseFail(res, err)
        //console.log("RESULTADO POPULARES 2", resultado)
        var idlistas = _.map(resultado,'idlista')
        var total = 10000
        var idUser = req.idUser

        getInfoList(idlistas, total, idUser, 'l.reproducciones DESC', idUser, function(err, data){

            if(err) return codigos.responseFail(res,err)
            //console.log("RESULTAOS FINALES POPULARES", _.sortBy(data, [function(o) { return o.user; }]))

            codigos.responseOk(res, data)

        })

    })
    // query.populares(function(err,resultado){
    //
    //
    //
    //     if(err) return codigos.responseFail(res, err)
    //     ////console.log("resultado ",resultado)
    //     var nuevos = {listas : [
    //     ]}
    //     var index = 0
    //     var idListas = _.map(_.uniqBy(resultado,'idlista' ),'idlista')
    //
    //     _.forEach(idListas, function(item){
    //         nuevos.listas.push({nombre:_.uniq( _.map(_.filter(resultado,function(o){return o.idlista == item}),'listanombre'))[0],
    //             listaid: item,
    //             isfavorited: false,
    //             miusuarioid: req.idUser,
    //             numfavoritos:_.uniq( _.map(_.filter(resultado,function(o){return o.idlista == item}),'numerofavorito'))[0] ,
    //             reproducciones:_.uniq( _.map(_.filter(resultado,function(o){return o.idlista == item}),'reproducciones'))[0] ,
    //             fecha:_.uniq( _.map(_.filter(resultado,function(o){return o.idlista == item}),'fecha'))[0] ,
    //             nombreusuario:_.uniq( _.map(_.filter(resultado,function(o){return o.idlista == item}),'nombreusuario'))[0],
    //             usuarioid: _.uniq( _.map(_.filter(resultado,function(o){return o.idlista == item}),'usuario_id'))[0],
    //             //urls:[_.uniq(_.map(_.filter(resultado,function(o){return o.listanombre == item}),'URL'))],
    //             info:[],
    //             tags:[_.uniq(_.map(_.filter(resultado,function(o){return o.idlista == item}),'nombre'))]}
    //         )
    //         ////console.log("antes de url")
    //
    //         var urls = _.uniqBy(_.filter(resultado,function(o){return o.idlista == item}),'URL')
    //         _.forEach(urls, function(item2){
    //             nuevos.listas[index].info.push({url: item2.URL,
    //                 artista: item2.artista,
    //                 cancion: item2.cancion,
    //                 thumbnail: item2.thumbnail
    //             })
    //         })
    //         index++
    //         ////console.log("urls nuevos",urls)
    //
    //
    //     })
    //
    //
    //
    //     var valuesFavorito = {id: req.idUser, limit: 18446744073, offset: 0 }
    //
    //     query.favoritos(valuesFavorito, function(err, resultado){
    //         //console.log("favoritos populares", resultado)
    //         var idFavoritos = resultado.idlista
    //         _.forEach(idFavoritos, function(item){
    //             _.find(nuevos.listas, {listaid: item}).isfavorited = true
    //
    //         })
    //
    //         //console.log("populares", nuevos)
    //         codigos.responseOk(res, nuevos)
    //     })
    //
    //
    //
    // })

});

/**
 * Obtiene lista de etiquetas
 */
router.get('/getTags', function(req, res, next) {
    //console.log("entrando gettags")
    query.getTags(function(err,resultado){
        if(err) return codigos.responseFail(res, err)
        codigos.responseOk(res, resultado)
    })
});

router.get('/tagCloud', function(req, res, next) {
    //console.log("entrando gettags")
    query.tagCloud(function(err,resultado){
        if(err) return codigos.responseFail(res, err)
        //console.log("tag cloud resultados", resultado)

        codigos.responseOk(res, resultado)
    })
});

router.post('/eliminar', function(req,res,next){
    var id = req.body.idlista
    //console.log("id pa eliminar", id)
    query.eliminar(id, function(err, resultado){
        if(err) return codigos.responseFail(res, err)

        ////console.log("nuevos", nuevos)
        codigos.responseOk(res, [])
    })

})

router.get('/perfilUsuario/:id/:pagina', function(req,res,next){
    var id = req.params.id
    //console.log("id pa buscar", id)
    var limit = ""
    var offset = ""
    if((req.params.pagina && parseInt(req.params.pagina)-1 < 0) || (req.params.limite && parseInt(req.params.limite)-1 < 0)  ){
        limit = 9
        offset = 0
        //console.log("entroe en el primero")
    } else {

        if(req.params.pagina && req.params.limite){
            limit = req.params.limite
            offset = (parseInt(req.params.pagina)-1) * req.params.limite
            //console.log("entroe en el segundo")

        }else if(req.params.pagina){
            limit = 9
            offset = (parseInt(req.params.pagina)-1) * limit
            //console.log("entroe en el tercero")

        }else{
            limit = 9
            offset = 0
            //console.log("entroe en el cuarto")

        }
    }

    //console.log("limit ", req.params.limit)
    //console.log("offset ", req.params.pagina)
    var valuesPagina = {limit: limit, offset: offset, id: id}

    //console.log("valuespagina pa la query", valuesPagina)
    getListById(valuesPagina, function(err,data){
        if(err) return codigos.responseFail(res,err)
        var idlistas = data.idlista
        var total = data.total
        var idUser = req.idUser
        getInfoList(idlistas, total, idUser, 'l.fecha', idUser, function(err,data){
            if(err) return codigos.responseFail(res,err)

            codigos.responseOk(res, data)
        })

    })

})




router.get('/masEscuchada', function(req, res, next) {

    query.masEscuchada(function(err,resultado){
        if(err) return codigos.responseFail(res, err)

        var json = {idlistas: _.map(resultado,'idlista'), order: 'l.reproducciones'}
        getInfoList(json.idlistas, 60, req.idUser, 'l.fecha', req.idUser, function(err,data){
            if(err) return codigos.responseFail(res,err)

            codigos.responseOk(res, data)
        })
        // query.getByIdlist(json, function (err, resultados) {
        //     if (err) return codigos.responseFail(res, err);
        //     var listas = {
        //         listas: []
        //     }
        //     var index = 0
        //     var idListas = _.map(_.uniqBy(resultados, 'idlista'), 'idlista')
        //
        //     _.forEach(idListas, function (item) {
        //         listas.listas.push({
        //                 nombre: _.uniq(_.map(_.filter(resultados, function (o) {
        //                     return o.idlista == item
        //                 }), 'listanombre'))[0],
        //                 idlista: item,
        //                 reproducciones: _.uniq(_.map(_.filter(resultados, function (o) {
        //             return o.idlista == item
        //         }), 'reproducciones'))[0],
        //                 numfavoritos: _.uniq( _.map(_.filter(resultado,function(o){return o.idlista == item}),'numerofavorito'))[0] ,
        //                 fecha: _.uniq( _.map(_.filter(resultado,function(o){return o.idlista == item}),'fecha'))[0] ,
        //                 usuarioid: _.uniq( _.map(_.filter(resultado,function(o){return o.idlista == item}),'usuario_id'))[0],
        //                 nombreusuario: _.uniq(_.map(_.filter(resultados, function (o) {
        //                     return o.idlista == item
        //                 }), 'nombreUsuario'))[0],
        //                 //urls:[_.uniq(_.map(_.filter(resultado,function(o){return o.listanombre == item}),'URL'))],
        //                 info: [],
        //                 tags: [_.uniq(_.map(_.filter(resultados, function (o) {
        //                     return o.idlista == item
        //                 }), 'nombre'))]
        //             }
        //         )
        //         ////console.log("antes de url")
        //
        //         var urls = _.uniqBy(_.filter(resultados, function (o) {
        //             return o.idlista == item
        //         }), 'URL')
        //         _.forEach(urls, function (item2) {
        //             listas.listas[index].info.push({
        //                 url: item2.URL,
        //                 artista: item2.artista,
        //                 cancion: item2.cancion,
        //                 thumbnail: item2.thumbnail,
        //                 idenlace: item2.idenlace
        //             })
        //         })
        //         index++
        //     })
        //
        //     //console.log("los resultaos la query", listas)
        //     codigos.responseOk(res, listas)
        // })
    })
});






module.exports = router;
