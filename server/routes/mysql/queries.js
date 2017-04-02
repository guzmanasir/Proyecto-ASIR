var mysql = require('../../../private/database/connection.js')

/**
 * Query para realizar el login
 * @param datosLogin
 */
exports.login = function(datosLogin,callback){
    var query =
        'SELECT nombre FROM usuario WHERE nombre = ? AND password = ?';

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



