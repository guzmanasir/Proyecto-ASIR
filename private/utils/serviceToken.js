/**
 * Created by jesus on 20/04/17.
 */
var jwt = require('jwt-simple');


exports.createToken = function(user){
    var payload = { id : user.id}
    var secret = 'xxx';
    return jwt.encode(payload, secret);

}
