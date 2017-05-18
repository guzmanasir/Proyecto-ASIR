/**
 * Created by jesus on 20/04/17.
 */
var jwt = require('jwt-simple');
var moment = require('moment')


exports.createToken = function(user){
    var payload = { id : user.id, iat : moment().unix(), exp : moment().add(1, 'day').unix() }
    var secret = 'xxx';

    return jwt.encode(payload, secret);

}
