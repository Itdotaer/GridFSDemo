var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conn = mongoose.connection;
var fs = require('fs');

var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

exports.upload = function(file, callback){
    var gfs = Grid(conn.db);

    var writestream = gfs.createWriteStream({
        filename: file.originalname
    });
    fs.createReadStream(file.path).pipe(writestream);

    writestream.on('close', function(file) {
        return callback(null, file);
    });
    writestream.on('error', function(err) {
        return callback(err, null);
    });
};

exports.remove = function(id, callback) {
    gfs.remove({
        _id: id
    }, callback);
};
