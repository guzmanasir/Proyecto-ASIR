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