const router = require('express').Router();
const {
  addReaction,
  removeReaction
} = require('../../controllers/ThoughtController');

// POST to create a reaction in a thought's reactions array.
router.route('/:thoughtId/reactions')
  .post(addReaction);

// DELETE to remove a reaction by its reactionId.
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;