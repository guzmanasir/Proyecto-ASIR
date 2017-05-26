#!/bin/bash

mysqlOk=$(dpkg-query -W --showformat='${Status}\n' mysql-server|grep "install ok installed")

echo Comprobando que esta instalado mysql-server


if [ "$mysqlOk" == " " ];
then
	echo No lo tienes instalado. Por favor instalalo antes de ejecutar este script
	exit -1
else
	echo Lo tienes instalado
fi

echo "Cual es tu usuario mysql?:"

read usuario

echo "Cual es tu contraseña de mysql?:"

read pass

echo "var mysql = require('mysql');

var dbConnection = mysql.createPool({
    host : 'localhost',
    connectionLimit : 10,
    port : '3306',
    user : '$usuario',
    password : '$pass',
    database : 'mydb'
});

dbConnection.query('SELECT 1 + 1 AS solution', function (error) {
    if (error) {
        console.log('Error al conectar con BD');
    } else {
        console.log('Database connected')
    }
});


module.exports = dbConnection;" > private/database/connection.js

mysql -u $usuario --password=$pass < mydb.sql

wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

npm install

npm install nodemon

bower install

echo "El servidor esta en el puerto 3000"

node bin/www
