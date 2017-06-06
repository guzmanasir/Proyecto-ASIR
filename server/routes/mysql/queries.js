var mysql = require('../../../private/database/connection.js')
var _ = require('lodash')
var async = require('async')
/**
 * Query para realizar el login
 * @param datosLogin
 */
exports.login = function(datosLogin,callback){
    var query =
        'SELECT nombre, id FROM usuario WHERE nombre = ? AND password = ?';

    var values = [datosLogin.usernameQuery, datosLogin.passwordQuery];
    mysql.query(query,values,function(err,results){
        if(err) return callback(10000,null);
        callback(null,results);
    })
}

/**
 * Query para realizar el registro
 * @param datosLogin
 * @param callback
 */
exports.registro = function(datosRegistro,callback){
    var query =
        'INSERT INTO usuario VALUES (NULL, ?, ?, ?, 0)';

    var values = [datosRegistro.usernameQuery, datosRegistro.passwordQuery, datosRegistro.emailQuery];
    mysql.query(query,values,function(err,results){
        if(err) {return callback(10001,null)}
        callback(null,results);
    })
}

/**
 * Query para insertar una lista
 * @param datosRegistro
 * @param callback
 */
exports.addList = function(datosList,callback){

    var valuesList = [datosList.nombreServer, datosList.id]
    var queryList =
        'INSERT INTO lista(nombre,usuario_id) VALUES (?, ?)';

    var listaId = ''

    // ===== Query Insert ====== Lista//
    mysql.query(queryList,valuesList,function(err,result){
        if(err) {return callback(10005,null)}
        //callback(null,result)
        listaId = result.insertId
        var interrogaciones = []
        var valuesTags = []

        if(!_.isArray(datosList.tagsServer))
            datosList.tagsServer = [datosList.tagsServer]

        datosList.tagsServer = _.map(datosList.tagsServer, "idetiqueta")

        _.forEach(datosList.tagsServer,function(item){
            item = parseInt(item)
            valuesTags.push( result.insertId, datosList.id, item )
            interrogaciones.push('(?,?,?)')
        })

        var queryTag =
            'INSERT INTO pertenece(lista_idlista,lista_usuario_id,etiqueta_idetiqueta) VALUES '+interrogaciones.join(',')+';'
        // ===== Query Insert ====== Tags//
        mysql.query(queryTag,valuesTags,function(err,result) {
            if (err) {console.error(err);return callback(10006, null)}

            var valuesUrl = []

            if(!_.isArray(datosList.urlsServer))
                datosList.urlsServer = [datosList.urlsServer]

            var queryUrl =
                'INSERT INTO enlace(URL, thumbnail) VALUES (?,?)'

            var urlOk = []
            var urlFail = {urlFail:[]}

            async.each(datosList.urlsServer, function(item, cb) {
                var valuestemp = [item.url, item.thumbnail]
                mysql.query(queryUrl, valuestemp, function (err, result) {
                    if (err) {
                        console.error("ERROR AL INSERTAR ENLACE ",err)
                        urlFail.urlFail.push({url: item.url, artista: item.artista, cancion: item.cancion})
                        cb()
                    } else {
                        urlOk.push({url: result.insertId, artista: item.artista, cancion:item.cancion});
                        cb()
                    }
                })
            },function(err,datos){

                var queryUrlFail = _.isEmpty(urlFail) ? 'SELECT 1+1' :
                    'SELECT idenlace FROM enlace WHERE URL IN (?)'
                var indexFail = 0;
                var urlsInFail = _.map(urlFail.urlFail,'url')

                async.each(urlsInFail, function(item, cb){
                    mysql.query(queryUrlFail, [item], function (err, result) {
                        if (err) {
                            console.error("ERROR AL OBTENER IDs", item, err)
                            cb()
                        } else {
                            if(!_.isEmpty(result)) urlFail.urlFail[indexFail].url = result[0].idenlace
                            cb()
                        }
                        indexFail++
                    })
                },function(err,datos){
                    var urlTotal = _.concat(urlOk, urlFail.urlFail)
                    interrogaciones = []
                    var valuesContiene = []
                    _.forEach(urlTotal,function(item){
                        item.url = parseInt(item.url)
                        valuesContiene.push( item.url, listaId, datosList.id, item.cancion, item.artista  )
                        interrogaciones.push('(?,?,?,?,?)')
                    })

                    var queryContiene =
                        'INSERT INTO contiene(enlace_idenlace, lista_idlista, lista_usuario_id, cancion, artista) values'+interrogaciones.join(',')+';'

                    mysql.query(queryContiene, valuesContiene, function(err, result){
                        if(err){
                            console.log("error en contiene", err)
                            return callback(err, null)
                        }
                        callback(null,result)
                    })


                })

            })

        })


        // ===== Query Insert ====== //




    })

}

exports.addSongs = function(datosList,callback) {

    if (!_.isArray(datosList.urlsServer))
        datosList.urlsServer = [datosList.urlsServer]

    var queryUrl =
        'INSERT INTO enlace(URL, thumbnail) VALUES (?,?)'

    var urlOk = []
    var urlFail = {urlFail: []}

    async.each(datosList.urlsServer, function (item, cb) {
        var valuestemp = [item.url, item.thumbnail]
        mysql.query(queryUrl, valuestemp, function (err, result) {
            if (err) {
                console.error("ERROR AL INSERTAR ENLACE ", err)
                urlFail.urlFail.push({url: item.url, artista: item.artista, cancion: item.cancion})
                cb()
            } else {
                urlOk.push({url: result.insertId, artista: item.artista, cancion: item.cancion});
                cb()
            }
        })
    }, function (err, datos) {

        var queryUrlFail = _.isEmpty(urlFail) ? 'SELECT 1+1' :
            'SELECT idenlace FROM enlace WHERE URL IN (?)'
        var indexFail = 0;
        var urlsInFail = _.map(urlFail.urlFail, 'url')

        async.each(urlsInFail, function (item, cb) {
            mysql.query(queryUrlFail, [item], function (err, result) {
                if (err) {
                    console.error("ERROR AL OBTENER IDs", item, err)
                    cb()
                } else {
                    if (!_.isEmpty(result)) urlFail.urlFail[indexFail].url = result[0].idenlace
                    cb()
                }
                indexFail++
            })
        }, function (err, datos) {
            var urlTotal = _.concat(urlOk, urlFail.urlFail)
            interrogaciones = []
            var valuesContiene = []
            _.forEach(urlTotal, function (item) {
                item.url = parseInt(item.url)
                valuesContiene.push(item.url, datosList.idlista, datosList.id, item.cancion, item.artista)
                interrogaciones.push('(?,?,?,?,?)')
            })

            var queryContiene =
                'INSERT INTO contiene(enlace_idenlace, lista_idlista, lista_usuario_id, cancion, artista) values' + interrogaciones.join(',') + ';'

            mysql.query(queryContiene, valuesContiene, function (err, result) {
                if (err) {
                    console.log("error en contiene", err)
                    return callback(err, null)
                }
                callback(null, result)
            })


        })

    })
}


exports.editList = function(json, callback){

    var valuesEdit = [json.idurls, json.idlista]

    var query =
        'UPDATE contiene SET DELETED = 1 WHERE enlace_idenlace IN (?) AND lista_idlista = ?'

    mysql.query(query, valuesEdit, function(err, result){
        if(err){
            return callback(err, null)
        }
        callback(null, result)
    })

}

exports.editSong = function(json, callback){

    var valuesEditSong = [json.nuevoArtista, json.nuevaCancion, json.idlista, json.idenlace]

    console.log("values pa la query", valuesEditSong)

    var query =
        'UPDATE contiene SET artista = ? , cancion = ? WHERE lista_idlista = ? AND enlace_idenlace = ?'

    mysql.query(query, valuesEditSong, function(err, result){
        if(err){
            return callback(err, null)
        }
        callback(null, result)
    })

}


exports.getList = function(id, callback){
    var query =
        'SELECT l.nombre as listanombre, l.idlista, c.artista, c.cancion, e.URL, e.idenlace, e.thumbnail, et.nombre ' +
        'FROM lista l ' +
        'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
        'INNER JOIN pertenece p ON l.idlista = p.lista_idlista ' +
        'INNER JOIN enlace e ON c.enlace_idenlace = e.idenlace ' +
        'INNER JOIN etiqueta et ON p.etiqueta_idetiqueta = et.idetiqueta ' +
        'WHERE l.usuario_id = ? AND l.deleted <> 1 AND c.deleted <> 1 AND p.deleted <> 1;'

    mysql.query(query,id,function(err,results){
        if(err) {console.error(err);return callback(100010,null)}
        callback(null,results);
    })
}

exports.buscador = function(json, callback){

    var valuesBuscar = [json.busqueda]

    var query =
        'SELECT l.nombre as listanombre, l.idlista, c.artista, c.cancion, e.URL, e.idenlace, e.thumbnail, et.nombre ' +
        'FROM lista l ' +
        'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
        'INNER JOIN pertenece p ON l.idlista = p.lista_idlista ' +
        'INNER JOIN enlace e ON c.enlace_idenlace = e.idenlace ' +
        'INNER JOIN etiqueta et ON p.etiqueta_idetiqueta = et.idetiqueta ' +
        'WHERE l.nombre LIKE ? AND l.deleted <> 1 AND c.deleted <> 1 AND p.deleted <> 1;'

    mysql.query(query,valuesBuscar,function(err,results){
        if(err) {console.error(err);return callback(100010,null)}
        callback(null,results);
    })
}

exports.favoritos = function(id, callback){
    var query =
        'SELECT l.nombre as listanombre, l.idlista, c.artista, c.cancion, e.URL, e.idenlace, e.thumbnail, et.nombre ' +
        'FROM lista l ' +
        'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
        'INNER JOIN pertenece p ON l.idlista = p.lista_idlista ' +
        'INNER JOIN favorito f ON l.idlista = f.lista_idlista ' +
        'INNER JOIN enlace e ON c.enlace_idenlace = e.idenlace ' +
        'INNER JOIN etiqueta et ON p.etiqueta_idetiqueta = et.idetiqueta ' +
        'WHERE f.usuario_id = ? AND l.deleted <> 1 AND c.deleted <> 1 AND p.deleted <> 1;'

    mysql.query(query,id,function(err,results){
        if(err) {console.error(err);return callback(100010,null)}
        callback(null,results);
    })
}

exports.favorito = function(json, callback){
    var valuesFavorito = [json.idUser, json.favoritoId ]
    var query =
        'INSERT INTO favorito(usuario_id, lista_idlista) values(?,?)'

    mysql.query(query,valuesFavorito,function(err,results){
        if(err) {console.error(err);return callback(100012,null)}
        callback(null,results);
    })
}


exports.newLists = function(callback){
    var query =
        'SELECT l.nombre as listanombre, l.usuario_id, l.idlista, c.artista, c.cancion, e.URL, e.thumbnail, et.nombre ' +
        'FROM lista l ' +
        'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
        'INNER JOIN pertenece p ON l.idlista = p.lista_idlista ' +
        'INNER JOIN enlace e ON c.enlace_idenlace = e.idenlace ' +
        'INNER JOIN etiqueta et ON p.etiqueta_idetiqueta = et.idetiqueta ' +
        'ORDER BY l.fecha DESC'

    mysql.query(query, function(err,results){
        if(err) {console.error(err);return callback(100010,null)}
        callback(null,results);
    })
}

/*exports.editList = function(callback){
 var query =
 ""
 }*/


exports.getTags = function(callback){
    var query =
        'select idetiqueta, nombre from etiqueta'

    mysql.query(query,function(err,results){
        if(err) {console.error(err);return callback(100011,null)}
        callback(null,results);
    })
}



