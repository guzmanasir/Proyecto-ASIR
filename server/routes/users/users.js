var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/frame', function(req, res, next) {
  res.render('angularjs/controller/auth/frame/frame')
});

router.get('/index', function(req, res, next) {
    res.render('angularjs/controller/auth/index/index')
});


module.exports = router;
