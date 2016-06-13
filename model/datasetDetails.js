var mongoose = require('mongoose');  

var datasetDetailSchema = new mongoose.Schema({ 
	name: {type: String, index: true}, 
}, {strict:false});

mongoose.model('DatasetDetail', datasetDetailSchema);

