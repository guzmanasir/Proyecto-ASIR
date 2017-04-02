var express = require('express');
var router = express.Router();
var query = require('./mysql/queries');
var codigos = require('../../private/utils/codewrapper');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('views/layout', { title: 'Express !' });
});

router.get('/403', function(req, res, next) {
    res.render('views/403');
});

router.get('/login', function(req, res, next) {
    res.render('angularjs/controller/login/login');
});

router.post('/loginForm', function(req, res, next) {
    var usuarioServer = req.body.usernameServer;
    var passwordServer = req.body.passwordServer;
    // aqui query
    var datosLogin = {
        usernameQuery : usuarioServer,
        passwordQuery : passwordServer
    }
    query.login(datosLogin,function(err,resultados){
        if(err){
            return codigos.responseFail(res, err);
        }
        if(resultados.length !== 1)
            return codigos.responseFail(res, 500)
        else
            codigos.responseOk(res,resultados)
    })

});

router.get('/registro', function(req, res, next) {
    res.render('angularjs/controller/registro/registro');
});

router.post('/registerForm', function(req, res, next) {
    var usuarioServer = req.body.usernameRegistro;
    var passwordServer = req.body.passwordRegistro;
    var emailServer = req.body.emailRegistro;
    // aqui query
    var datosRegistro = {
        usernameQuery : usuarioServer,
        passwordQuery : passwordServer,
        emailQuery : emailServer
    }

    query.registro(datosRegistro,function(err,resultados){
        if(err){
            console.error("error de query ",err)
            return codigos.responseFail(res,10001)
        }
        codigos.responseOk(res,resultados);
    })

});

module.exports = router;
