var express = require('express');
var async = require("async");
var request = require('request');
var mongoose = require('mongoose');
var router = express.Router();


var current_pack = "current_package_list_with_resources/";

var dataset_list_url = "package_list";
var get_dataset_url = "package_show"

// create a queue and set the max the amount of concurrent ajax request to 20
var queue = async.queue(saveDatasetAndResources, 25);




/* GET resources. */
router.get('/update', function (req, res, next) {

  var RepositoryModel = mongoose.model('Repository');

  RepositoryModel.find({ "software": "CKAN" }, function (err, mongoRepositories) {

    // iterate over all CKAN repositories
    if (mongoRepositories != "")
      mongoRepositories.forEach(function (element) {
        
      
        
        // var repositoryDatasetListURL = repositories[repository] + dataset_list_url + "?limit=1";
        
        // if the API url is different of the URL (this should be manually checked)
        if( typeof element.APIURL !== "undefined"){
          element.url  = element.APIURL;
        }
        
        if(element.url.slice(-1) != "/")
          element.url = element.url + '/';
           
        var repositoryDatasetListURL = element.url + "api/3/action/" + dataset_list_url;
          
        // console.log(repositoryDatasetListURL);
    
        // request.get(dataset_list_url + "", {}, function (err, res) {
        (function (element, repositoryDatasetListURL) {
          
          request.get(repositoryDatasetListURL, function (err, res) {

            try {

              var datasets = JSON.parse((res.body)).result;
              // console.log(JSON.stringify(res.body));

              console.log("Fetching datasets from: " + res.request.uri.href);

              for (var i in datasets) {
                var dataset = {
                  repository: element.url + "api/3/action/",
                  datasetID: datasets[i]
                }
                 
                // console.log("new resource added: "+resource.resource);
                queue.push(dataset);
              }
            }
            catch (E) {
              var Repository = mongoose.model('Repository');
              Repository.update({ url: element.url }, { error: E }, function () {
                console.log(E + " -> " + element.url);
              });
            }

          });
        } (element, repositoryDatasetListURL));

      })



  }).skip(0).limit(91);


  // after finish all ajax request, save all formats to a the Format collection
  queue.drain = function () {

    console.log("All datasets were fetched! Saving formats to MongoDB...");

    for (var form in formats) {

      var FormatModel = mongoose.model('Format');
      var tt = new FormatModel({ name: form, repository: formats[form] });
      tt.save();

    }

  };



  res.send('yada');


});

function saveDatasetAndResources(dataset, callback) {
  
  // get details of the dataset
  var datasetURL = dataset.repository + get_dataset_url + "?id=" + dataset.datasetID;

  console.log("Fetching resources from dataset: " + datasetURL);
  console.log("Repository: " + dataset.repository);
  
  // saving the dataset
  var Dataset = mongoose.model("Dataset");
  var dataset = new Dataset({ datasetID: dataset.datasetID, repository: dataset.repository });
  dataset.save();

  // make the request
  request.get(datasetURL, {}, function (e, r) {

    try {
      
      // console.log(JSON.parse(r.body).result.resources);
      
      // array of resources
      var resources = JSON.parse(r.body).result.resources;
      
      if(typeof resources == 'undefined')
          resources = JSON.parse(r.body).result[0].resources;

      resources.forEach(function (res) {

        console.log("Saving resource: " + res.name);

        res.repositoryID = dataset.repository;
        
        // find a new resource 
        (function (res) {
          mongoose.model("Resource").find({ url: res.url }, function (err, docs) {

            if (docs == "") {
              var Resource = mongoose.model("Resource");
              var resource = new Resource(res);
              resource.save();

            }

          })
        } (res)
          );


      });
    }
    catch (E) {
      console.log(E);
    }

    callback();
  });

}


router.get('/dae', function (req, res, next) {

  // make the request
  request.get("http://healthdata.gov/api/3/action/package_show?id=medicaid-analytic-extract-max-general-information", {}, function (e, r) {

    try {
      // var coisa = JSON.parse(r.body).result[0].resources;
      //  console.log(JSON.parse(r.body).result.resources);
      
      // array of resources
      // if()
      var resources = JSON.parse(r.body).result[0];
      if(typeof resources == 'undefined')
          resources = JSON.parse(r.body).result[0].resources;

      resources.forEach(function (res) {

        console.log("Saving resource: " + res.name);

        res.repositoryID = dataset.repository;
        
        // find a new resource 
        (function (res) {
          mongoose.model("Resource").find({ url: res.url }, function (err, docs) {

            if (docs == "") {
              var Resource = mongoose.model("Resource");
              var resource = new Resource(res);
              resource.save();

            }

          })
        } (res)
          );


      });
    }
    catch (E) {
      console.log(E);
    }

  });
});




router.get('/list', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  var RepositoryModel = mongoose.model('Repository');

  RepositoryModel.find({ "software": "CKAN" }, function (err, docs) {
    res.send(JSON.stringify(docs, null, 3));
  });
});


module.exports = router;