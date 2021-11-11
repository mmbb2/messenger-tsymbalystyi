const Router = require('express').Router;
const ConversationController = require('../controllers/conversation-controller');
const router = new Router();

router.post('/create', ConversationController.create);
router.get('/:userId', ConversationController.findAllOfUser);


module.exports = router;