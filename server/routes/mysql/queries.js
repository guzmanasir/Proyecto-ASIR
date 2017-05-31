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

        console.log(datosList.tagsServer)

        _.forEach(datosList.tagsServer,function(item){
            item = parseInt(item)
            valuesTags.push( result.insertId, datosList.id, item )
            interrogaciones.push('(?,?,?)')
        })
        console.log("interrogaciones ",interrogaciones.join(','))
        console.log("valores ",valuesTags)

        var queryTag =
            'INSERT INTO pertenece(lista_idlista,lista_usuario_id,etiqueta_idetiqueta) VALUES '+interrogaciones.join(',')+';'
        // ===== Query Insert ====== Tags//
        mysql.query(queryTag,valuesTags,function(err,result) {
            if (err) {console.error(err);return callback(10006, null)}

            var valuesUrl = []

            if(!_.isArray(datosList.urlsServer))
                datosList.urlsServer = [datosList.urlsServer]

            var queryUrl =
                'INSERT INTO enlace(URL,artista,cancion, thumbnail) VALUES (?,?,?,?)'

            var urlOk = []
            var urlFail = []

            async.each(datosList.urlsServer, function(item, cb) {
                var valuestemp = [item.url, item.artista, item.cancion, item.thumbnail]
                mysql.query(queryUrl, valuestemp, function (err, result) {
                    if (err) {
                        //console.error("ERROR AL INSERTAR ENLACE ",err)
                        urlFail.push(item.url)
                        cb()
                    } else {
                        urlOk.push(result.insertId);
                        cb()
                    }
                })
            },function(err,datos){
                console.log(urlFail)


                var queryUrlFail = _.isEmpty(urlFail) ? 'SELECT 1+1' :
                    'SELECT idenlace FROM enlace WHERE URL IN (?)'
                mysql.query(queryUrlFail, urlFail, function(err, result){
                    if(err){
                        console.error("ERROR AL OBTENER IDs",urlFail,err)
                        //return callback(err, null)
                    }

                    var duplicadas = _.map(result,"idenlace")

                    console.log("resultado query duplicada", result)

                    var urlTotal = _.concat(urlOk, duplicadas)
                    interrogaciones = []
                    var valuesContiene = []
                    _.forEach(urlTotal,function(item){
                        item = parseInt(item)
                        valuesContiene.push( item, listaId, datosList.id )
                        interrogaciones.push('(?,?,?)')
                    })

                    console.log("values contiene", valuesContiene)


                    var queryContiene =
                        'INSERT INTO contiene(enlace_idenlace, lista_idlista, lista_usuario_id) values'+interrogaciones.join(',')+';'

                    mysql.query(queryContiene, valuesContiene, function(err, result){
                        if(err){
                            console.log("error en contiene", err)
                            return callback(err, null)
                        }
                        callback(null,result)
                    })


                })

            })


            // ===== Query Insert ====== //



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


exports.getList = function(id, callback){
    var query =
    'SELECT l.nombre as listanombre, l.idlista, e.idenlace, e.URL, e.artista, e.cancion, e.thumbnail, et.nombre ' +
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

exports.newLists = function(callback){
    var query =
        'SELECT l.nombre as listanombre, e.URL, e.artista, e.cancion, e.thumbnail, et.nombre ' +
        'FROM lista l ' +
        'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
        'INNER JOIN pertenece p ON l.idlista = p.lista_idlista ' +
        'INNER JOIN enlace e ON c.enlace_idenlace = e.idenlace ' +
        'INNER JOIN etiqueta et ON p.etiqueta_idetiqueta = et.idetiqueta ' +
        'ORDER BY l.idlista'

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



