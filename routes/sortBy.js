var express = require('express');
var router = express.Router();
var sortComments = require('../models/sortBy')

router.get('/colum=:colum?&order=:order?&page=:page?', function(req, res, next) {
  sortComments.getAllSortComments(req.params.colum, req.params.order, req.params.page || 1, res);
});

module.exports = router;
