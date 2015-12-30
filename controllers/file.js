var fs = require('fs');
var path = require('path');
var multer = require('multer');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

var FileProxy = require('../proxys').File;
var UploaderProxy = require('../proxys').Uploader;

var config = require('../config');

exports.uploadPageWithGridFS = function(req, res, next){
    res.render('uploadFilesWithGridFS', {
        title: 'UploadFilesWithGridFS'
    });
};

exports.uploadWithGridFS = function(req, res, next){
    var file = req.file;
    var saveAtLocal = req.body.saveAtLocal || 'off';
    console.log('SaveAtLocal', saveAtLocal);
    if(file){
        UploaderProxy.upload(file, function(err, cbGridFS){
            if(err){
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }

            var localPath = saveAtLocal == 'off' ? '' : '\\' + config.uploadPath + '\\' + file.filename;
            FileProxy.add(file.originalname, cbGridFS._id, localPath, function(err, cbFile){
                //Remvoe file
                if(saveAtLocal == 'off'){
                    fs.unlink(file.path, function(unlinkErr){
                        if(err || unlinkErr){
                            res.render('error', {
                                message: 'Error',
                                error: err || unlinkErr
                            });
                        }
                    });
                }else{
                    if(err){
                        res.render('error', {
                            message: 'Error',
                            error: err
                        });
                    }
                }

                res.redirect('index');
            });
        });
    }else{
        res.render('error', {
            message: 'No file upload.',
            error: ''
        });
    }
};

exports.downloadGridFS = function(req, res, next){
    var gridFSId = req.params['gridFSId'];

    if(gridFSId){
        var conn = mongoose.connection;
        var gfs = Grid(conn.db);
        gfs.createReadStream({
            _id: gridFSId
        }).pipe(res);
    }else{
        console.error('No gridFSId.');
    }
};

exports.download = function(req, res, next){
    var localPath = req.query['localPath'];
    if(localPath){
        var file = __dirname + '\\..' + localPath;
        res.download(file);
    }else{
        res.render(error, {
            message: 'No file.',
            error: ''
        });
    }
};

exports.get = function(req, res, next){
    var fileName = req.query['fileName'] || '';

    var index = req.query['index'] || 1;
    var size = req.query['size'] || 10;

    FileProxy.get(fileName, index, size, function(err, files){
        if(err){
            res.render(error, {
                message: 'No file upload.',
                error: ''
            });
        }
        // res.json({ result: 'success', data: files });
        res.render('files', {
            title: 'Files',
            files: files
        });
    });
};
