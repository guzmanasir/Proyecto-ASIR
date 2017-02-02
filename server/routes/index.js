var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express !' });
});

router.get('/403', function(req, res, next) {
    res.render('403', { title: 'Express !' });
});

module.exports = router;
