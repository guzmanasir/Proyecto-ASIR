var mysql = require('../../../private/database/connection.js')

exports.login = function(datosLogin){
  var query =
  'SELECT nombre FROM usuario WHERE usuario = ? AND password = ?';
  var values = [datosLogin.username, datosLogin.password];
  mysql.query(query,values,function(err,results){
    if(err)
      return;
    console.log(results);
  })

}

exports.registro = function(){

}
