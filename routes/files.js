var express = require('express');
var router = express.Router();
var FileController = require('../controllers/file');
var path = require('path');

var config = require('../config');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var dest = path.resolve(config.uploadPath);
        cb(null, dest);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
    }
});

var fileFilter = function(req, file, cb){
    var extName = path.extname(file.originalname);

    // if(extName =='.PNG' || extName == '.png' || extName == '.jpge' || extName == '.JPGE'){
    //     cb(null, true);
    // }else{
    //     cb(new Error('Not allowed file.'));
    // }

    cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: fileFilter });

//Get Uploaded Files
router.get('/index', FileController.get);

//Upload Files with mongo gridfs
router.get('/uploadwithgridfs', FileController.uploadPageWithGridFS);
router.post('/uploadwithgridfs', upload.single('upfile'), FileController.uploadWithGridFS);

//Download
router.get('/downloadGridFS/:gridFSId', FileController.downloadGridFS);
router.get('/download', FileController.download)

module.exports = router;
