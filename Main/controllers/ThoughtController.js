const { Thought, User} = require ('../models');
// module.exports = {

const thoughtController = {

async getThoughts(req, res) {
    try {
        const thoughts = await Thought.find().populate('reactions');
        res.json(thoughts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    },
}


module.exports = thoughtController;