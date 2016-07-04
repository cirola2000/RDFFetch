var express = require('express');
var async = require("async");
var request = require('request');
var mongoose = require('mongoose');
var normalize = require('../model/normalized');
var router = express.Router();


var current_pack = "current_package_list_with_resources/";

var dataset_list_url = "package_list";
var get_dataset_url = "package_show"

// create a queue and set the max the amount of concurrent ajax request to 20
var queue = async.queue(saveDatasetAndResources, 20);


/* GET resources. */
router.get('/update', function (req, res, next) {

  var RepositoryModel = mongoose.model('Repository');

  RepositoryModel.find({ "software": "CKAN" }, function (err, mongoRepositories) {

    // iterate over all CKAN repositories
    if (mongoRepositories != "")
      mongoRepositories.forEach(function (element) {

        if (element.active == true) {
        
          // var repositoryDatasetListURL = repositories[repository] + dataset_list_url + "?limit=1";
          element.original = element.url;
        
          // if the API url is different of the URL (this should be manually checked)
          if (typeof element.APIURL !== "undefined") {
            element.url = element.APIURL;
          }

          if (element.url.slice(-1) != "/") {
            element.url = element.url + '/';

          }

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
                    repositoryID: element.original,
                    datasetID: datasets[i]
                  }
                 
                  // console.log("new resource added: "+resource.resource);
                  // console.log(dataset);
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
        }
      })



  }).skip(0).limit(900);


  // after finish all ajax request, save all formats to a the Format collection
  queue.drain = function () {

    console.log("All datasets were fetched! Saving formats to MongoDB...");

  };

  res.send('Please check logs in the console.');


});
var sourceee = 0;
function saveDatasetAndResources(dataset, callback) {
  
  // get details of the dataset
  var datasetURL = dataset.repository + get_dataset_url + "?id=" + dataset.datasetID;

  console.log("Fetching resources from dataset: " + datasetURL);
  console.log("Repository: " + dataset.repository);


<<<<<<< HEAD
  console.log(sourceee);

=======
>>>>>>> 6766a337dc9ac1de4267931a31261cdf7f468e1a
  // saving the dataset
  saveDataset({ datasetID: dataset.datasetID, repository: dataset.repository, repositoryID: dataset.repositoryID });  

  // make the request to retrieve dataset and search for resources
  request.get(datasetURL, {}, function (e, r) {

    try {
      
      // save dataset details
      saveDatasetDetail(JSON.parse(r.body).result);

      
      // array of resources
      var resources = JSON.parse(r.body).result.resources;


      if (typeof resources == 'undefined')
        resources = JSON.parse(r.body).result[0].resources;

      resources.forEach(function (res) {

        res.repositoryID = dataset.repositoryID;
        res.repository = dataset.repository;
        res.datasetID = dataset.datasetID;

        console.log("Saving resource: " + res.name + " from dataset " + res.datasetID);

<<<<<<< HEAD
        sourceee++;

=======
>>>>>>> 6766a337dc9ac1de4267931a31261cdf7f468e1a
        saveResource(res);

      });
    }
    catch (E) {
      console.log(E);

    }

    callback();
  });

}


function saveDatasetDetail(result) {
  mongoose.model("DatasetDetail").find({ name: result.name }, function (err, docs) {
    if (docs == "") {
      var DatasetDetail = mongoose.model("DatasetDetail");
      var datasetDetail = new DatasetDetail(result);
      datasetDetail.save();
    }
  })
};

function saveDataset(d) {

  mongoose.model("Dataset").find({ datasetID: d.datasetID }, function (err, docs) {
    if (docs == "") {
      var Dataset = mongoose.model("Dataset");
      var dataset = new Dataset({ datasetID: d.datasetID, repository: d.repository, repositoryID: d.repositoryID });
      dataset.save();
    }
  })
}


function saveResource(res) {
  mongoose.model("Resource").find({ url: res.url }, function (err, docs) {
<<<<<<< HEAD
    sourceee--;


=======
>>>>>>> 6766a337dc9ac1de4267931a31261cdf7f468e1a
    if (docs == "") {

      normalize(res.format, function (f) {
        res.normalizedFormat = f;

        var Resource = mongoose.model("Resource");
        var resource = new Resource(res);
        resource.save();
      })

    }
  })
}




router.get('/list', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  var RepositoryModel = mongoose.model('Repository');

  RepositoryModel.find({ "software": "CKAN" }, function (err, docs) {
    res.send(JSON.stringify(docs, null, 3));
  });
});

router.get('/listRDF', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  var ResourceModel = mongoose.model('Resource');

  ResourceModel.find({ "normalizedFormat": { "$ne": "" } }, function (err, docs) {
    res.send(JSON.stringify(docs, null, 3));
  });
});

router.get('/listCKANDatasets', function (req, res, next) {

  res.setHeader('Content-Type', 'application/json');

  var RepositoryModel = mongoose.model('Resource');

  RepositoryModel.find({ "software": "CKAN" }, function (err, docs) {
    res.send(JSON.stringify(docs, null, 3));
  });
});


module.exports = router;
