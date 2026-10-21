const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.post('/sign-up', userController.handleRegistration);

router.post('/sign-in', userController.handleLogin);

router.get('/' , userController.handleGetAllUsers);
// router.get('/:userId', handleGetAUser);
// router.get('/search-user' , handleSearchUser);

// router.put('/edit-profile/:userId', handleEditUser);

// router.delete('/delete-user/:userId' , handleDeleteUser);


module.exports = router;