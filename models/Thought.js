// Importing Mongoose and destructuring Schema and Types.
const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

// Defines schema for reactions as subdocuments within Thoughts.
const reactionSchema = new Schema({
     // Unique identifier for each reaction using ObjectId.
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
// Schema definition for Thoughts. 
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

//Virtual property for reactionCount, this returns the number of reactions for each thought. 
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);
// Export so the thought model can be used elsewhere in our application. 
module.exports = Thought;