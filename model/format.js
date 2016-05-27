var mongoose = require('mongoose');  

var typeSchema = new mongoose.Schema({  
  name: { type: String, index: true },
  repository: { type: String, index: true },
  isRDF: Boolean
});

mongoose.model('Format', typeSchema);

