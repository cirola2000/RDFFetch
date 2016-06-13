var mongoose = require('mongoose');  

var resourceSchema = new mongoose.Schema({  
  name: { type: String, index: true },
  url: { type: String, index: true },
  description: String,
  package_id: { type: String, index: true },
  id: String,
  size: String,
  mimetype: String,
  created: String,
  format: { type: String, index: true },
  normalizedFormat: { type: String, index: true },
  repositoryID: { type: String, index: true },
  error: String
});

mongoose.model('Resource', resourceSchema);

