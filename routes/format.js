var express = require('express');
var async = require("async");
var request = require('request');
var mongoose = require('mongoose');
var router = express.Router();


// var url = "https://datahub.io/api/3/action/";

// list of CKAN repositories
var repositories = ["https://datahub.io/api/3/action/"];


var current_pack = "current_package_list_with_resources/";
// var group_list = "group_list/";
var dataset_list_url =  "package_list";
var get_dataset_url =  "package_show"

// create a queue and set the max the amount of concurrent ajax request to 20
var queue = async.queue(read_format, 20);

// create a queue and set the max the amount of concurrent ajax request to 20
// var queue = async.queue(read_format, 10);

// store all formats and datasources here
var formats = [];




/* GET listing. */
router.get('/update', function (req, res, next) {



  var RepositoryModel = mongoose.model('Repository');

      RepositoryModel.find({"software":"CKAN"}, function(err, docs){
            // res.send(JSON.stringify(docs, null, 3));

  // iterate over all CKAN repositories
  if(docs!="")
  for (var repository in docs) {
        
    // var repositoryDatasetListURL = repositories[repository] + dataset_list_url + "?limit=1";
    var repositoryDatasetListURL = docs[repository].url +"api/3/action/"+ dataset_list_url ;
    // console.log(repositoryDatasetListURL);
    
    // request.get(dataset_list_url + "", {}, function (err, res) {
    request.get(repositoryDatasetListURL, {timeout:5000}, function (err, res) {
      
      try{

        var result = JSON.parse((res.body)).result;
       // console.log(JSON.stringify(res.body));

        console.log("Fetching datasets from: " + res.request.uri.href);

        for (var i in result) {
           var item = { repository: docs[repository].url+"api/3/action/",
           resource: result[i]}
                 
           console.log("new resource added: "+item.resource);
           // queue.push(item);
         }
       }
       catch(E){
         var Repository = mongoose.model('Repository');
         Repository.update({url:docs[repository].url},{error: E}, function(){
          console.log(E); 
         });
       }

    });
    
    
  }
  
      }).skip(0).limit(91);


  // after finish all ajax request, save all formats to a the Format collection
  queue.drain = function () {
    
    console.log("All datasets were fetched! Saving formats to MongoDB...");

    for (var form in formats) {

      var FormatModel = mongoose.model('Format');
      var tt = new FormatModel({ name: form, repository: formats[form]});
      tt.save();

    }
    
  };



  res.send('yada');


});

function read_format(result, callback) {
  
  // get details of the dataset
  var datasetURL = result.repository + get_dataset_url +"?id=" + result.resource
  
  console.log("Fetching resources from dataset: "+ datasetURL);
  console.log("Repository: "+ result.repository);

  // make the request
  request.get(datasetURL, {}, function (e, r) {

    try{
      
    // array of resources
    var resource = JSON.parse(r.body).result.resources;
    
    for (var res in resource) {
      
      // add resource and repository to an array
      
      formats[resource[res].format] = result.repository;
    }
    }
    catch(E){
      
    console.log(E);
    }

    callback();
  });

}

module.exports = router;