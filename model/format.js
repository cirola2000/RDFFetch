var mongoose = require('mongoose');  

var typeSchema = new mongoose.Schema({  
  format: { type: String, index: true },
  formatNormalized: { type: String, index: true },
  status: {type: String, index: true ,enum: ['VALID', 'INVALID', 'UNKNOWN']},
  compression: {type: String, index: true ,enum: ['zip', 'gz', 'tar', 'tar.gz', 'tar.bz', 'tar.bz2', 'bz2', 'rar', 'bzip2']},
});

mongoose.model('Format', typeSchema);

