const express = require("express");
const router = express.Router();

router.get('/', handleGetAllConversations);
router.get('/:user-id', handleGetConversationsByUserId);
router.get('/:conversation-id', handleGetConversationsById);
router.get('/create-conversation' , handleCreateConversation);
router.get('/delete-conversation' , handleDeleteConversation);

module.exports = router;