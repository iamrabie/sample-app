const express = require("express");
const router = express.Router();


router.get('/' , handleGetAllUsers);
router.get('/:user-id', handleGetAUser);
router.post('/sign-up', handleCreateUser);
router.put('/edit-profile', handleEditUser);
router.put('/delete-user' , handleDeleteUser);


module.exports = router;