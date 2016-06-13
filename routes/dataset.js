var express = require('express');
var async = require("async");
var request = require('request');
var mongoose = require('mongoose');
var router = express.Router();
var xmldoc = require('xmldoc');


/* LIST all datasets*/
router.get('/list', function (req, res, next) {
      res.setHeader('Content-Type', 'application/json');
  
      var DatasetModel = mongoose.model('Dataset');

      DatasetModel.find({}, function(err, docs){
            res.send(JSON.stringify(docs, null, 3));
      });
});




module.exports = router;