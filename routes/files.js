var express = require('express');
var router = express.Router();
var FileController = require('../controllers/file');

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

//Get Uploaded Files
router.get('/', FileController.get);

//Upload Files
router.get('/upload', FileController.uploadPage);
router.post('/upload', upload.single('upfile'), FileController.upload);

module.exports = router;
