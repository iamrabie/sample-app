const express = require("express");
const router = express.Router();


router.get('/by-reactions', handleGetMessagesByReaction);
router.post('/send-message' , handleSendMessage);
router.edit('/edit-message' , handleEditMessage);
router.delete('/delete-message' , handleDeleteMessage);

module.exports = router;