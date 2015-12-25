var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
    fileName: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

mongoose.model('File', FileSchema);
