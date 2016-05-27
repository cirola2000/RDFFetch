var mongoose = require('mongoose');  

var datasetSchema = new mongoose.Schema({  
  datasetID: { type: String, index: true },
  repository: { type: String, index: true },
  error: String
});

mongoose.model('Dataset', datasetSchema);

