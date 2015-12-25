var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conn = mongoose.connection;
var fs = require('fs');

var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

exports.upload = function(file, callback) {

    conn.once('open', function(err) {
        if (err) {
            return callback(err, null);
        }
        var gfs = Grid(conn.db);

        // streaming to gridfs
        //filename to store in mongodb
        var writestream = gfs.createWriteStream({
            filename: fileName
        });
        // fs.createReadStream(path).pipe(writestream);

        writestream.put(file.buffer);

        writestream.on('close', function(file) {
            return callback(null, file);
        });
        readstream.on('error', function(err) {
            return callback(err, null);
        });
    });
};

exports.remove = function(id, callback) {
    gfs.remove({
        _id: id
    }, callback);
};
