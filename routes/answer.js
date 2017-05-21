var express = require('express');
var router = express.Router();
var answer = require('../models/answer');

router.get('/', function(req, res, next) {
    answer.getAllAnswers(function(err, rows) {
    if(err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post('/', function(req, res, next) {
  var commentIP = 'IP:' + req.ip + '; ' + 'User-Agent: ' + req.headers['user-agent'];
  req.checkBody('email', 'Invalid email address').isEmail();
  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
    console.log(errors);
  } else {
    req.session.success = true;
    answer.addAnswer(req.body, commentIP, function(err, count) {
      if(err) {
        res.json(err);
      } else {
        res.json(req.body);
      }
    });
  }
});

module.exports = router;
