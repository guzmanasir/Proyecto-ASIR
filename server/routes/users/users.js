var express = require('express');
var router = express.Router();
var middlewareToken = require('../../../private/middleware/middlewareToken')
var codigos = require('../../../private/utils/codewrapper');
var _ = require('lodash')
var query = require('../mysql/queries');

/* GET users listing. */
router.use(middlewareToken.middlewareToken);


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

router.get('/tempRecomendaciones', function(req, res, next) {
    res.render('angularjs/controller/auth/recomendaciones/recomendaciones')
});

router.get('/addListDialog', function(req, res, next) {
    res.render('angularjs/controller/auth/frame/addListDialog')
});

router.get('/editSongDialog', function(req, res, next) {
    res.render('angularjs/controller/auth/frame/editSongDialog')
});

router.post('/addList', function(req, res, next){
    var json = req.body;
    json.id = req.idUser;
    if ( !json.id || json.id <= 0 || _.isUndefined(json.nombreServer)
        || _.isUndefined(json.tagsServer)
        || _.isUndefined(json.urlsServer)
        || json.nombreServer == "")
        return codigos.responseFail(res,10010)
    //console.log(json);

    query.addList(json, function(err,resultado){
        if(err) return codigos.responseFail(res, err)
        console.log(resultado)
        codigos.responseOk(res, json)

    })
})

/**
 * Obtiene lista de listas a partir de un id de usuario
 */
router.get('/getLists', function(req, res, next) {
    var id = req.idUser;
    // var result = {
    //     total: [{nombre:'lista1', urls: [], tags : []}]
    // }
    query.getList(id, function(err,resultado){

        if(err) return codigos.responseFail(res, err)
        //console.log("resultado ",resultado)
        var listas = {listas : [
        ]}
        var index = 0
        var nombreListas = _.map(_.uniqBy(resultado,'listanombre' ),'listanombre')

        _.forEach(nombreListas, function(item){
            listas.listas.push({nombre:item,
                //urls:[_.uniq(_.map(_.filter(resultado,function(o){return o.listanombre == item}),'URL'))],
                info:[],
                tags:[_.uniq(_.map(_.filter(resultado,function(o){return o.listanombre == item}),'nombre'))]}
            )
            //console.log("antes de url")

            var urls = _.uniqBy(_.filter(resultado,function(o){return o.listanombre == item}),'URL')
            _.forEach(urls, function(item2){
                listas.listas[index].info.push({url: item2.URL,
                artista: item2.artista,
                cancion: item2.cancion,
                thumbnail: item2.thumbnail
                })
            })
            index++
            console.log("urls ",urls)


        })
        codigos.responseOk(res, listas)

    })

});

/**
 * Obtiene lista de etiquetas
 */
router.get('/getTags', function(req, res, next) {
    console.log("entrando gettags")
    query.getTags(function(err,resultado){
        if(err) return codigos.responseFail(res, err)
        codigos.responseOk(res, resultado)
    })
});

router.get('/tempMisListas', function(req, res, next) {
    res.render('angularjs/controller/auth/mislistas/mislistas')
});




module.exports = router;
