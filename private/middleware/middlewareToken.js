/**
 * Created by jesus on 17/05/17.
 */

var jwt = require('jwt-simple');
var moment = require('moment')
var error = require('../utils/codewrapper');

exports.middlewareToken = function(req, res, next){
    if (!req.headers.authorization) {
        console.error("no hay token")
        return error.responseForbiden(res, 10002);
    }
    var token = req.headers.authorization.split(" ")[1];
    try {

        var payload = jwt.decode(token, 'xxx');
        if ( payload.exp <=  moment().unix()) {
            return error.responseForbiden(res, 10003);
        }
        console.log("hay token ",payload.id)
        next()

    } catch(err) {
        console.error("error en tokenmiddleware")
        return error.responseForbiden(res, 10004);
    }
}