const Router = require('express').Router;
const UserController = require('../controllers/user-controller.js');
const router = new Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/findUsers', UserController.findUsers);

module.exports = router;