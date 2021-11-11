const Router = require('express').Router;
const MessageController = require('../controllers/message-controller');
const router = new Router();

router.post('/send', MessageController.send);
router.get('/getAll/:conversationId', MessageController.getAllOfConversation);


module.exports = router;