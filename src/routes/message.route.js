const express = require("express");
const router = express.Router();

router.get('/conversation/:convoId' , handleGetMessagesByConvoId);
router.get('/reactions/:messageId', handleGetMessageReactions);
router.post('/send-message' , handleSendMessage);

router.put('/edit-message/:senderId/:messageId' , handleEditMessage);
router.put('/add-reaction/:messageId/:userId' , handleAddReaction);

router.delete('/delete-message/:senderId/:messageId' , handleDeleteMessage);

module.exports = router;