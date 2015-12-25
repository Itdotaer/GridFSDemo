var mongoose = require('mongoose');
var config = require('../config');

exports.connect = function(callback){
    mongoose.connect(config.db, {
        server: {poolSize: 20}
    }, callback);
};
