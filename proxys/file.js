var models = require('../models');
var File = models.File;

exports.add = function(fileName, gridFSId, localPath, callback){
    var file = new File({
        fileName: fileName,
        gridFSId: gridFSId,
        localPath: localPath
    });

    file.save(callback);
};

exports.get = function(index, size, callback){
    var conditions = {fileName: fileName};

    File.find(conditions).limit(size).skip((index - 1) * size).exec(callback);
};

exports.get = function(fileName, index, size, callback){
    var conditions = {fileName: fileName};

    if(fileName == ''){
        return File.find().limit(size).skip((index - 1) * size).exec(callback);
    }

    File.find(conditions).limit(size).skip((index - 1) * size).exec(callback);
};

exports.getById = function(id, callback){
    var conditions = {_id: id};

    File.find(conditions, callback);
};

exports.delete = function(id, callback){
    var conditions = {_id: id};

    File.remove(conditions, callback);
};
