var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
    fileName: {type: String, required: true},
    gridFSId: {type: Schema.ObjectId, required: true},
    localPath: {type: String},
    createdAt: {type: Date, default: Date.now}
});

mongoose.model('File', FileSchema);
