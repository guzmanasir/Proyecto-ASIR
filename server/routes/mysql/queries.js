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
    mysql.query(query,values,function(err,results,fields){
        if(err) {
            console.log("error registro",this._events.end[0])
            return callback(10001,null)
        }
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
                            //console.log("error en contiene", err)
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

/**
 * Query para insertar nuevas canciones en una lista ya creada
 * @param datosList
 * @param callback
 */

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
                    //console.log("error en contiene", err)
                    return callback(err, null)
                }
                callback(null, result)
            })


        })

    })
}

/**
 * Query para eliminar una cancion de una lista
 * @param json
 * @param callback
 */

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

/**
 * Query para editar una cancion ya insertada
 * @param json
 * @param callback
 */
exports.editSong = function(json, callback){

    var valuesEditSong = [json.nuevoArtista, json.nuevaCancion, json.idlista, json.idenlace]

    //console.log("values pa la query", valuesEditSong)

    var query =
        'UPDATE contiene SET artista = ? , cancion = ? WHERE lista_idlista = ? AND enlace_idenlace = ?'

    mysql.query(query, valuesEditSong, function(err, result){
        if(err){
            return callback(err, null)
        }
        callback(null, result)
    })

}

/**
 * Query para traer listas de un usuario especifico
 * @param id
 * @param callback
 */
exports.getList = function(values, callback){

    var values1 = [values.id, values.limit, values.offset]

    var query =
        'SELECT DISTINCT l.idlista, l.fecha ' +
        'FROM lista l ' +
        'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
        'WHERE l.usuario_id = ? AND l.deleted <> 1 AND c.deleted <> 1 ' +
        'ORDER BY l.fecha DESC LIMIT ? OFFSET ?'

    mysql.query(query,values1,function(err,resultado1){

        if(err) {console.error(err);return callback(100010,null)}


        var query = 'select COUNT(DISTINCT idlista) as total ' +
            'from lista l '+
            'inner join contiene c on l.idlista = c.lista_idlista ' +
            'where l.deleted <> 1 and l.usuario_id = ? ;'
        // callback(null,results)

        mysql.query(query, values.id, function(err,results){
            if(err) {console.error(err);return callback(100010,null)}
            //var resultados = results + resultsPrimeragina


            var resultadoTotal = {idlista:  _.map(resultado1,'idlista'), total: results[0].total}

            callback(null,resultadoTotal)

        })

    })
}

/**
 * Query buscador para traer ids de listas a partir de una busqueda
 * @param json
 * @param callback
 */
exports.buscador = function(json, callback){

    var valuesBuscar = [json.busqueda, json.limit, json.offset]

    //console.log("los valoreh", valuesBuscar, "er jsoin", json)

    if(json.idtag === "todos"){
        if( json.busqueda === "%undefined%" || json.busqueda === "%%"){
            valuesBuscar = [json.limit, json.offset]
            var query =
                'SELECT l.idlista ' +
                'FROM lista l ' +
                'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
                'WHERE l.deleted <> 1 AND c.deleted <> 1 ' +
                'GROUP BY l.idlista, '+json.ordenar.split(" ", 1)+' ORDER BY '+json.ordenar+' ' +
                'LIMIT ? OFFSET ? '

            var query2 = 'SELECT COUNT(DISTINCT l.idlista) as total ' +
                'FROM lista l ' +
                'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
                'WHERE l.deleted <> 1 AND c.deleted <> 1 ' +
                'ORDER BY '+json.ordenar

        } else {
            var query =
                'SELECT l.idlista ' +
                'FROM lista l ' +
                'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
                'WHERE '+json.tipo+' LIKE ? AND l.deleted <> 1 AND c.deleted <> 1 ' +
                'GROUP BY l.idlista, '+json.ordenar.split(" ", 1)+' ORDER BY '+json.ordenar+' ' +
                'LIMIT ? OFFSET ? '

            var query2 = 'SELECT COUNT(DISTINCT l.idlista) as total ' +
                'FROM lista l ' +
                'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
                'WHERE '+json.tipo+' LIKE ? AND l.deleted <> 1 AND c.deleted <> 1 ' +
                'ORDER BY '+json.ordenar
        }

    } else {
        if( json.busqueda === "%undefined%"|| json.busqueda === "%%"){
            valuesBuscar = [json.limit, json.offset]
            var query =
                'SELECT l.idlista ' +
                'FROM lista l ' +
                'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
                'INNER JOIN pertenece p ON p.lista_idlista = c.lista_idlista ' +
                'WHERE p.etiqueta_idetiqueta = '+ json.idtag +' AND l.deleted <> 1 AND c.deleted <> 1 ' +
                'GROUP BY l.idlista,'+json.ordenar.split(" ", 1)+' ORDER BY '+json.ordenar+' '+
                'LIMIT ? OFFSET ? '

            var query2 =
                'SELECT COUNT(DISTINCT l.idlista) as total ' +
                'FROM lista l ' +
                'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
                'INNER JOIN pertenece p ON p.lista_idlista = c.lista_idlista ' +
                'WHERE p.etiqueta_idetiqueta = '+ json.idtag +' AND l.deleted <> 1 AND c.deleted <> 1 ' +
                'ORDER BY '+json.ordenar
        } else {
            var query =
                'SELECT l.idlista ' +
                'FROM lista l ' +
                'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
                'INNER JOIN pertenece p ON p.lista_idlista = c.lista_idlista ' +
                'WHERE '+json.tipo+' LIKE ? AND p.etiqueta_idetiqueta = '+ json.idtag +' AND l.deleted <> 1 AND c.deleted <> 1 ' +
                'GROUP BY l.idlista,'+json.ordenar.split(" ", 1)+' ORDER BY '+json.ordenar+' ' +
                'LIMIT ? OFFSET ? '

            var query2 =
                'SELECT COUNT(DISTINCT l.idlista) as total ' +
                'FROM lista l ' +
                'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
                'INNER JOIN pertenece p ON p.lista_idlista = c.lista_idlista ' +
                'WHERE '+json.tipo+' LIKE ? AND p.etiqueta_idetiqueta = '+ json.idtag +' AND l.deleted <> 1 AND c.deleted <> 1 ' +
                'ORDER BY '+json.ordenar
        }

    }

    //console.log("fallo en la query", query)


    mysql.query(query,valuesBuscar,function(err,resultado1){
        if(err) {console.error(err);return callback(100010,null)}

        //console.log("RESULTADO DE LA PRIMERA BUSCADOR", resultado1)

        mysql.query(query2,json.busqueda,function(err,results){
            if(err) {console.error(err);return callback(100010,null)}
            //console.log("El total", results)

            var resultadoTotal = {idlista:  _.map(resultado1,'idlista'), total: results[0].total}

            //console.log("RESULTADO DE LA QUERY BUSCADOR", resultadoTotal)

            callback(null,resultadoTotal);
        })


    })
}

/**
 * Trae toda la informacion de una lista a partir de idlistas
 * @param json
 * @param callback
 */


exports.getByIdlist = function(json, callback){
    //console.log("na mas entrar get by", json)
    var valuesIds = _.isArray(json.idlistas) ? json.idlistas : [json.idlistas]
    var order = json.order
    var interrogaciones = ""
    var coma = ","
    for(var i = 0; i < valuesIds.length; i++){
        interrogaciones += "?"
        if( i != valuesIds.length - 1)
            interrogaciones += coma
    }
    //console.log("los idsss", valuesIds)
    var query =
        'SELECT l.nombre as listanombre, l.usuario_id, l.idlista, l.reproducciones, DATE_FORMAT(l.fecha,"%d/%m/%Y") as fecha, u.nombre as nombreUsuario, c.artista, c.cancion, e.URL, e.thumbnail, e.idenlace, et.nombre, COUNT(f.usuario_id) as numerofavorito ' +
        'FROM lista l ' +
        'INNER JOIN usuario u ON l.usuario_id = u.id ' +
        'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
        'INNER JOIN pertenece p ON l.idlista = p.lista_idlista ' +
        'LEFT JOIN favorito f ON l.idlista = f.lista_idlista AND f.deleted <> 1 ' +
        'INNER JOIN enlace e ON c.enlace_idenlace = e.idenlace ' +
        'INNER JOIN etiqueta et ON p.etiqueta_idetiqueta = et.idetiqueta ' +
        'WHERE l.idlista in ('+interrogaciones+') AND l.deleted <> 1 AND c.deleted <> 1 AND p.deleted <> 1 ' +
        'group by listanombre, l.usuario_id, l.idlista, c.artista, c.cancion, e.URL, e.thumbnail, et.nombre ' +
        'order by ' + order

    mysql.query(query, valuesIds, function(err,results){
        if(err) {console.error(err);return callback(100010,null)}
        //console.error(results)
        callback(null,results);
    })

}

/**
 * Query que trae las listas favoritas de un usuario
 * @param id
 * @param callback
 */

exports.favoritos = function(values, callback){

    //console.log("entrando en query", values)

    var values1 = [values.id, values.limit, values.offset]

    //console.log("values favoritos!", values1)

    var query =
        'SELECT DISTINCT l.idlista ' +
        'FROM lista l ' +
        'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
        'INNER JOIN favorito f ON l.idlista = f.lista_idlista ' +
        'WHERE f.usuario_id = ? AND l.deleted <> 1 AND c.deleted <> 1 AND f.deleted <> 1 ' +
        'LIMIT ? OFFSET ? '

    mysql.query(query,values1,function(err,resultado1){
        if(err) {console.error(err);return callback(100010,null)}

        //console.log("resultado de la primera buscador", resultado1)

        var query = 'select COUNT(DISTINCT idlista) as total ' +
            'from lista l '+
            'inner join contiene c on l.idlista = c.lista_idlista ' +
            'inner join favorito f on l.idlista = f.lista_idlista ' +
            'where l.deleted <> 1 and c.deleted <> 1 and f.usuario_id = ? ;'
        // callback(null,results)

        mysql.query(query, values.id, function(err,results){
            if(err) {console.error(err);return callback(100010,null)}
            //var resultados = results + resultsPrimeragina


            var resultadoTotal = {idlista:  _.map(resultado1,'idlista'), total: results[0].total}



            callback(null,resultadoTotal)

        })
    })
}

/**
 * Query para recomendar listas a un usuario a partir de su id
 * @param id
 * @param callback
 */

exports.recomendaciones = function(id, callback){
    var query =
        'SELECT  c.lista_idlista, c.artista ' +
        'FROM contiene c ' +
        'JOIN lista l on c.lista_idlista = l.idlista ' +
        'JOIN pertenece p ON c.lista_idlista = p.lista_idlista and p.lista_usuario_id != ? ' +
        'JOIN etiqueta et ON p.etiqueta_idetiqueta = et.idetiqueta and et.idetiqueta IN (SELECT etiqueta_idetiqueta from pertenece where lista_usuario_id = ? ) ' +
        'WHERE c.artista not in (SELECT artista from contiene where lista_usuario_id = ? ) and c.lista_idlista not in (select lista_idlista from favorito where usuario_id = ? ) and l.deleted <> 1 ' +
        'group by lista_idlista, c.artista;'
    var values = [id, id, id, id]
    mysql.query(query,values,function(err,results){
        if(err) {console.error(err);return callback(100010,null)}


        callback(null,results);
    })
}

/**
 * Query para insertar una lista en favorito
 * @param json
 * @param callback
 */

exports.favorito = function(json, callback){
    var valuesFavorito = [json.idUser, json.favoritoId]

    //console.log("values insert fav", valuesFavorito)

    var query = 'SELECT * FROM favorito WHERE usuario_id = ? AND lista_idlista = ?'

    mysql.query(query,valuesFavorito,function(err,results){
        if(err) {console.error(err);return callback(100012,null)}

        if(_.isEmpty(results)){
            var query =
                'INSERT INTO favorito(usuario_id, lista_idlista) values(?,?)'

            mysql.query(query,valuesFavorito,function(err,results){
                if(err) {console.error(err);return callback(100012,null)}
                callback(null,results);
            })

        } else {
            var query =
                'UPDATE favorito SET deleted = 0 WHERE usuario_id = ? AND lista_idlista = ?'

            mysql.query(query,valuesFavorito,function(err,results){
                if(err) {console.error(err);return callback(100012,null)}
                callback(null,results);
            })
        }


    })


}

/**
 * Query para eliminar una lista
 * @param id
 * @param callback
 */

exports.eliminar = function(id, callback){
    var values = [id]
    var query =
        'UPDATE lista SET deleted = 1 WHERE idlista = ?'

    mysql.query(query,values,function(err,results){
        if(err) {console.error(err);return callback(100012,null)}
        callback(null,results);
    })
}

/**
 * query para editar informacion de un usuario
 * @param id
 * @param callback
 */
exports.editarInfo = function(json, callback){
    var values = [json.nombre, json.password, json.email, json.idUser]
    var query =
        'UPDATE usuario SET nombre = ? , password = ?, email = ? where id = ?'

    mysql.query(query,values,function(err,results){
        if(err) {console.error(err);return callback(100012,null)}
        callback(null,results);
    })
}

/**
 * Query para contar reproducciones
 * @param json
 * @param callback
 */

exports.reproduccion = function(json, callback){
    var valuesReproduccion = [json.listaId]

    var query =
        'UPDATE lista SET reproducciones = reproducciones + 1 WHERE idlista = ?'

    mysql.query(query,valuesReproduccion,function(err,results){
        if(err) {console.error(err);return callback(100012,null)}
        callback(null,results)



    })


}

/**
 * Query para eliminar una lista de favorito
 * @param json
 * @param callback
 */

exports.noFavorito = function(json, callback){
    var valuesFavorito = [json.idUser, json.favoritoId ]
    var query =
        'UPDATE favorito SET deleted = 1 WHERE usuario_id = ? AND lista_idlista = ?'

    mysql.query(query,valuesFavorito,function(err,results){
        if(err) {console.error(err);return callback(100012,null)}
        callback(null,results);
    })
}

exports.infoUsuario = function(id, callback){
    var id = [id]
    var query =
        'SELECT nombre, password, email FROM usuario WHERE id = ?'
    mysql.query(query,id,function(err,results){
        if(err) {console.error(err);return callback(100012,null)}
        callback(null,results);
    })

}


/**
 * Query para sacar listas nuevas con paginacion
 * @param valuesPagina
 * @param callback
 */


exports.newLists = function(valuesPagina, callback){

    var values =  [parseInt(valuesPagina.limit), valuesPagina.offset]
    //console.log("EN QUERY: values ",values)
    var query =
        'SELECT SQL_CALC_FOUND_ROWS DISTINCT l.idlista, l.fecha ' +
        'FROM lista l ' +
        'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
        'WHERE l.deleted <> 1 ' +
        'ORDER BY l.fecha DESC LIMIT ? OFFSET ?;'


    mysql.query(query, values, function(err,resultsPrimera){
        if(err) {console.error(err);return callback(100010,null)}

        ////console.log("resultaos", resultsPrimera)
        //var valuesPrimera = resultsPrimera

        var query = 'select COUNT(DISTINCT idlista) as total ' +
            'from lista l '+
            'inner join contiene c on l.idlista = c.lista_idlista ' +
            'where l.deleted <> 1;'
        // callback(null,results)

        mysql.query(query, function(err,results){
            if(err) {console.error(err);return callback(100010,null)}
            //var resultados = results + resultsPrimera
            var resultados = {idlista: _.map(resultsPrimera,'idlista'), total: results[0].total }
            //console.log("total", resultados)
            callback(null,resultados)

        })

    })
}

/**
 * Query para sacar listas populares por numero de favoritos
 * @param callback
 */
exports.populares = function(valuesPagina, callback){
    var values =  [parseInt(valuesPagina.limit), valuesPagina.offset]
    // var query =
    //     'SELECT l.nombre as listanombre, l.usuario_id, l.idlista, l.reproducciones,DATE_FORMAT(l.fecha,"%d/%m/%Y") as fecha, u.nombre as nombreusuario, c.artista, c.cancion, e.URL, e.thumbnail, et.nombre, COUNT(f.usuario_id) as numerofavorito ' +
    //     'FROM lista l ' +
    //     'INNER JOIN usuario u ON l.usuario_id = u.id ' +
    //     'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
    //     'INNER JOIN pertenece p ON l.idlista = p.lista_idlista ' +
    //     'LEFT JOIN favorito f ON l.idlista = f.lista_idlista ' +
    //     'INNER JOIN enlace e ON c.enlace_idenlace = e.idenlace ' +
    //     'INNER JOIN etiqueta et ON p.etiqueta_idetiqueta = et.idetiqueta ' +
    //     'WHERE l.deleted <> 1 AND c.deleted <> 1 AND p.deleted <> 1 ' +
    //     'group by listanombre, l.usuario_id, l.idlista, c.artista, c.cancion, e.URL, e.thumbnail, et.nombre ' +
    //     'ORDER BY l.reproducciones DESC'
    var query =
        'SELECT DISTINCT l.idlista, l.reproducciones ' +
        'FROM lista l ' +
        'INNER JOIN contiene c ON l.idlista = c.lista_idlista ' +
        'WHERE l.deleted <> 1 ' +
        'ORDER BY l.reproducciones DESC LIMIT ? OFFSET ?;'


    mysql.query(query, values, function(err,results){
        if(err) {console.error(err);return callback(100010,null)}
        callback(null,results);
    })
}


/**
 * Query para seleccionar todos los tags
 * @param callback
 */
exports.getTags = function(callback){
    var query =
        'select idetiqueta, nombre from etiqueta'

    mysql.query(query,function(err,results){
        if(err) {console.error(err);return callback(100011,null)}
        callback(null,results);
    })
}

/**
 * Query para la nube de tags
 * @param callback
 */
exports.tagCloud = function(callback){
    var query =
        'select et.nombre as word, et.idetiqueta as id, count(p.etiqueta_idetiqueta) as size '+
        'from pertenece p '+
        'inner join etiqueta et on et.idetiqueta = p.etiqueta_idetiqueta '+
        'group by et.nombre, et.idetiqueta'

    mysql.query(query,function(err,results){
        if(err) {console.error(err);return callback(100011,null)}
        callback(null,results);
    })
}


/**
 * Query para la lista mas escuchada de la semana
 * @param callback
 */
exports.masEscuchada = function(callback){
    var query =
        'SELECT idlista from lista ' +
        'where fecha BETWEEN  date_sub(now(),INTERVAL 1 WEEK) and now() AND deleted <> 1 ' +
        'order by reproducciones desc limit 1'

    mysql.query(query,function(err,results){
        if(err) {console.error(err);return callback(100011,null)}
        callback(null,results);
    })
}


