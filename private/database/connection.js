var mysql = require('mysql');

var dbConnection = mysql.createPool({
    host : 'localhost',
    connectionLimit : 10,
    port : '3306',
    user : 'root',
    password : 'toor',
    database : 'mydb'
});

dbConnection.query('SELECT 1 + 1 AS solution', function (error) {
    if (error) {
        console.log('Error al conectar con BD');
    } else {
        console.log('Database connected')
    }
});


module.exports = dbConnection;
