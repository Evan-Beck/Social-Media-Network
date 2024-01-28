// Importing the thought and user models from the models folder. Then exporting an object containing controller functions in module.exports. 
const { Thought, User} = require ('../models');
 module.exports = {

    // Get all thoughts controller function. Using mongoose to find all thoughts and populate their reactions. 
async getThoughts(req, res) {
    try {
        const thoughts = await Thought.find().populate('reactions');
        res.json(thoughts); // Sending created thoughts in a json response. 
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    },


async getSingleThought(req, res) {
    try {
          // Finding a thought by its ID, which is passed in the URL parameters.
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
},

async createThought(req, res) {
    try {
        // Creating a new thought using the data sent in the request body.
        const thought = await Thought.create(req.body);
        await User.findOneAndUpdate(
            { _id: req.body.userId },// Finding the user by ID provided in the request body.
            { $push: { thoughts: thought._id } },// Pushing the new thought's ID to the user's thoughts.
            { new: true }// Option to return the updated document.
        );
        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
},

async updateThought(req, res) {
    try {
         // Updating a thought based on its ID and the new data provided in the request body
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, // Finding the thought by its ID in the URL parameters
            { $set: req.body }, // Setting the new thought data
            { new: true, runValidators: true }// Options for returning the updated document and running validators
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
},

async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
},

async addReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
},

async removeReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}}
