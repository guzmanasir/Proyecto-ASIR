/**
 * Created by jesus on 2/04/17.
 */

/**
 * codigo: 0 - 15000
 * mensaje: "descripcion"
 * data:
 */


function errCode(errCode,data){
    var descripcion = "Error no encontrado"
    switch(errCode){
        case 0: descripcion = "Ok"; break;

        case 500: descripcion = "El valor no existe"; break;

        // === ERRORES A PARTIR DE AQUI === //
        case 10000 : descripcion = "Error en query login"; break;
        case 10001 : descripcion = "Error en query registro"; break;
        case 10002 : descripcion = "Error no existe token"; break;
        case 10003 : descripcion = "Error sesión caducada"; break;
        case 10005 : descripcion = "Error en query insert list"; break;
        case 10006 : descripcion = "Error en query insert tag"; break;
        case 10010 : descripcion = "Error en query get list"; break;
        case 10011 : descripcion = "Error en query get tags"; break;
        case 10012 : descripcion = "Error en query favorito"; break;



    }

    var json = {
        codigo: errCode,
        descripcion: descripcion
    }
    if(data)
        json.data = data;
    return json;
}

function response(res,status,data){
    res.status(status).json(data)
}
/**
 * Respuesta OK
 * @param res
 * @param data
 */
exports.responseOk = function(res,data){
    response(res,200,errCode(0,data))
};

exports.responseFail = function(res,err,body){
    var httpCode = err >= 10000 ? 400 : 200;
    response(res,httpCode,errCode(err,null))
};

exports.responseForbiden = function(res,err,body){
    var httpCode = 403
    response(res,httpCode,errCode(err,null))
};
