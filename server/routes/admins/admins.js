/**
 * Created by guzman on 2/02/17.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index', { title: "Hola admin"});
});



router.get('/dashboard', function(req, res, next) {
    //console.log("entro en dashboard");
    res.render('adminDashboard');
});


module.exports = router;
