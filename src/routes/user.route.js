const express = require("express");
const router = express.Router();

router.post('/sign-up', handleCreateUser);
router.post('/login', handleUserLogin);

router.get('/' , handleGetAllUsers);
router.get('/:userId', handleGetAUser);
router.get('/search-user' , handleSearchUser);

router.put('/edit-profile/:userId', handleEditUser);

router.delete('/delete-user/:userId' , handleDeleteUser);


module.exports = router;