var express = require('express');
var router = express.Router();
var comment = require('../models/comment');

router.get('/', function(req, res, next) {
  comment.getAllComments(1, res);
});

router.get('/page/:page?', function(req, res, next) {
  comment.getAllComments(req.params.page || 1, res);
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
    comment.addComment(req.body, commentIP, function(err, count) {
      if(err) {
        res.json(err);
      } else {
        res.json(req.body);
      }
    });
  }
});

module.exports = router;
