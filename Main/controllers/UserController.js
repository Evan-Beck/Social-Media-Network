const { User, Thought} = require ('../models');

// module.exports = {

    const userController = {
        async getUsers(req, res) {
            try {
                const users = await User.find().populate('thoughts').populate('friends');
                res.json(users);
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        },
    };

    module.exports = userController;


