const express = require('express');
const router = express.Router();

const {
    getUsers, // gets all users
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
  } = require('../../controllers/UserController');
  
// Route to handle getting all users and creating a new user.  
router.route('/').get(getUsers).post(createUser);
  
 // Route to handle getting, updating, and deleting a single user by their ID.
  router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);
  
// Route to handle adding a friend to a user's friend list.
router.route('/:userId/friends/:friendId')
.post(addFriend);
  
 // Route to handle removing a friend from a user's friend list.
router.route('/:userId/friends/:friendId')
.delete(removeFriend);
  
  module.exports = router;