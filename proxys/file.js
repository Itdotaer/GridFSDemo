var models = require('../models');
var File = models.File;

exports.add = function(fileName, callback){
    var file = new File({
        fileName: fileName
    });

    file.save(callback);
};

exports.get = function(fileName, index, size, callback){
    var conditions = {fileName: fileName};

    File.find(conditions).limit(opt.size).skip((opt.index - 1) * opt.size).exec(callback);
};

exports.getById = function(id, callback){
    var conditions = {_id: id};

    File.find(conditions, callback);
};

exports.delete = function(id, callback){
    var conditions = {_id: id};

    File.remove(conditions, callback);
};
