const router = require('express').Router();
const ThoughtRoutes = require('./ThoughtRoutes');
const UserRoutes = require('./UserRoutes');

router.use('/thoughts', ThoughtRoutes);
router.use('/users', UserRoutes);

module.exports = router;
