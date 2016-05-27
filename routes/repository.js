var express = require('express');
var async = require("async");
var request = require('request');
var mongoose = require('mongoose');
var router = express.Router();
var xmldoc = require('xmldoc');


// w3 api
var apiURL = "http://service.re3data.org/api/v1/";

var repositoriesURL = "repositories";
var repositoryURL = "repository/"

// create a queue and set the max the amount of concurrent ajax request to 20
var queue = async.queue(read_repository, 20);


/* LIST all repositories*/
router.get('/list', function (req, res, next) {
      res.setHeader('Content-Type', 'application/json');
  
      var RepositoryModel = mongoose.model('Repository');

      RepositoryModel.find({}, function(err, docs){
            res.send(JSON.stringify(docs, null, 3));
      });
});



/* UPDATE list of repositories */
router.get('/update', function (req, res, next) {
    
  // var repositoryDatasetListURL = repositories[repository] + dataset_list_url + "?limit=1";
  var repositoriesFullURL = apiURL + repositoriesURL;
    
  // request.get(dataset_list_url + "", {}, function (err, res) {
  request.get(repositoriesFullURL, {}, function (err, res) {
      
    // print the repository
    console.log("Fetching datasets from " + repositoriesFullURL);
            
    // parsing XML from re3
    var document = new xmldoc.XmlDocument(res.body);

    var ctrl = 0;

    document.eachChild(function (child, index, array) {  
    
      // object with name, id and link of the repository
      var rep = {};

      // if (ctrl < 1) {
      for (var c in child.children) {
        if (child.children[c].name == 'name') {
          rep.name = child.children[c].val;
        }
        else if (child.children[c].name == 'id') {
          rep.re3ID = child.children[c].val;
        }
      }

      queue.push(rep);
      // }
      ctrl++;

    });
  })

  // after finish all ajax request, save all formats to a the Format collection
  queue.drain = function () {

    console.log("All repositories were fetched! Saving them to MongoDB...");

  };

  res.send('Updating repositories... check console for logs.');

});

function read_repository(rep, callback) {
  
  // get details of the repository
  var repositoryFullURL = apiURL + repositoryURL + rep.re3ID;

  console.log("Fetching metadata from repository: " + repositoryFullURL);

  // make the request
  request.get(repositoryFullURL, {}, function (e, res) { 
    
    // parsing XML from re3
    var document = new xmldoc.XmlDocument(res.body);

    document.eachChild(function (child, index, array) {

      for (var c in child.children) {

        if (child.children[c].name == 'r3d:repositoryURL') {
          rep.url = child.children[c].val;
        }
        else if (child.children[c].name == 'r3d:software') {
          rep.software = child.children[c].firstChild.val;
        }
      }
      
      // check if repsitory exist in mongodb. Caso not, save it!
      var RepositoryModel = mongoose.model('Repository');

      var query = RepositoryModel.find({});

      query.where("re3ID", rep.re3ID);

      query.exec(function (err, docs) {
        if (docs ==  "")
        {
    
          // save object in mongodb
          var tt = new RepositoryModel(rep);
          tt.save();
        }
    
      });
    
    });

    callback();
  });

}

module.exports = router;