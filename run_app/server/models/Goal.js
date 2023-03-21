const { Schema, model } = require('mongoose');

const goalSchema = new Schema(
    {
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        status: {
            type: String
        },
        currentLocation: {
            type: [Number]
        },
        currentDistance: {
            type: Number
        },
        username: {
            type: String
        },
        goalDef: {
            type: Schema.Types.ObjectId,
            ref: 'GoalDefinition'
        }
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

goalSchema.virtual('postCount').get(function () {
    return this.posts.length;
})

const Goal = model('Goal', goalSchema);

module.exports = Goal;