const Router = require('express').Router;
const FileController = require('../controllers/file-controller');
const router = new Router();

router.post('/save', FileController.save);



module.exports = router;