const router = require('express').Router();
const {
  getThoughts, // Gets all thoughts. 
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/ThoughtController');

// GET all thoughts and POST a new thought.
router.route('/')
  .get(getThoughts)
  .post(createThought);

// GET, PUT, and DELETE a single thought by its _id.
router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// Routes for reactions, if not handled in a separate file.
router.route('/:thoughtId/reactions')
  .post(addReaction);

  // Route to handle removing a reaction from a thought
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;
