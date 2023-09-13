const express = require('express');
const router = express.Router();

const ObjectID = require('mongodb').ObjectID;

const Result = require('../models/results');

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/:id', function(req, res, next) {
  Result.findOne({_id: ObjectID(req.params.id)}, function (err, result) {
    if (err) console.error(err);
    if (result) {
      res.render('results', {
        totals: result.totals
      });
    } else {
      next();
    }
  });
});

module.exports = router;
