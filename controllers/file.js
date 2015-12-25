var FileProxy = require('../proxys').File;
var UploaderProxy = require('../proxys').Uploader;
var mongoose = require('mongoose');
var conn = mongoose.connection;
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

exports.uploadPage = function(req, res, next){
    console.log('req', req);
    res.render('uploadFiles', {
        title: 'UploadFiles'
    });
};

exports.upload = function(req, res, next){
    console.log('req', req.file);
    var file = req.file;
    if(file){
        // UploaderProxy.upload(file, function(err, file){
        //     if(err){
        //         res.render('error', {
        //             message: err.message,
        //             error: err
        //         });
        //     }
        //
        //     res.redirect('files');
        // });
        //
        res.redirect('files');
    }else{
        res.render(error, {
            message: 'No file upload.',
            error: ''
        });
    }
};

exports.download = function(req, res, next){
    var storedId = req.params['storedId'];

    if(!storedId){
        var gfs = Grid(conn.db);
        gfs.createReadStream({
            _id: storedId
        }).pipe(res);
    }else{
        console.error('No storedId');
    }
};

exports.get = function(req, res, next){
    var fileName = req.query['fileName'];
    var index = req.query['index'] || 1;
    var size = req.query['size'] || 10;

    FileProxy.get(fileName, index, size, function(err, files){
        if(err){
            return console.error(err);
        }
        return console.logl(files);
    });
};
