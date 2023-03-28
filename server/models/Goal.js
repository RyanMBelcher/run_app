const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

const goalSchema = new Schema(
    {
        startDate: {
            type: Date,
            default: Date.now,
            get: formatTimestamp
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
        goalDefinition: {
            type: Schema.Types.ObjectId,
            ref: 'GoalDefinition'
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

function formatTimestamp(time) {
    return dayjs(time).format('MMM D, YYYY [at] h:mm A');
};

goalSchema.virtual('postCount').get(function () {
    return this.posts.length;
})

const Goal = model('Goal', goalSchema);

module.exports = Goal;