var mongoose = require('mongoose');  

var repositorySchema = new mongoose.Schema({  
  re3ID: { type: String, index: true },
  name: { type: String, index: true },
  software: { type: String, index: true },
  url: { type: String, index: true },
  APIURL: { type: String, index: true },
  error: String,
  active: Boolean,
});

mongoose.model('Repository', repositorySchema);

