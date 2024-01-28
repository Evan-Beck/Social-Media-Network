const { User, Thought } = require('../models');

module.exports = {
    // Gets all users.
    async getUsers(req, res) {
        // Retrieve all users and populate their 'thoughts' and 'friends' fields.
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.json(users);// Send the list of users as a JSON response.
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Gets a single user by ID.
    async getSingleUser(req, res) {
        try {
            // Retrieve a user by their ID provided in the request parameters.
            const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Creates a new user.
    async createUser(req, res) {
        // Create a new user with the data sent in the request body.
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Updates a user by ID.
    async updateUser(req, res) {
        try {
            // Update a user's data based on their ID and the new data provided in the request body.
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId }, // User ID from URL parameters.
                { $set: req.body }, // New data for the user.
                { new: true, runValidators: true } // Options for returning the updated document and running schema validators.
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Deletes a user by ID.
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            // Optionally, delete the user's thoughts here if required
            await Thought.deleteMany({ username: user.username });
            res.json({ message: 'User successfully deleted!' });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Adds a new friend to a user's friend list.
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Removes a friend from a user's friend list.
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
};