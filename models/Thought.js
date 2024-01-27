const mongoose = require('mongoose');
const { Schema, Types } = mongoose;


// const reactionSchema = require('../reaction');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => timestamp.toISOString() // Formatting timestamp
    }
}, {
    toJSON: {
        getters: true
    },
    id: false
});

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
            get: timestamp => timestamp.toISOString() 
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema] 
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//Virtual for reactionCount. 
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;