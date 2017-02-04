var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('views/layout', { title: 'Express !' });
});

router.get('/403', function(req, res, next) {
    res.render('views/403');
});

router.get('/login', function(req, res, next) {
    res.render('angularjs/controller/login/login');
});

router.get('/loginForm', function(req, res, next) {
    var usuario = req.headers('username');
    //res.render('angularjs/controller/login/login');

});

router.get('/registro', function(req, res, next) {
    res.render('angularjs/controller/registro/registro');
});

module.exports = router;
