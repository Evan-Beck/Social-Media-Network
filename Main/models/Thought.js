const mongoose = require('mongoose');
const { Schema } = mongoose;



const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => timestamp.toISOString() // Example getter for formatting
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema] // Replace with your reactionSchema
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;