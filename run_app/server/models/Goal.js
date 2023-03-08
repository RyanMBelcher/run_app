const { Schema, model } = require('mongoose');

const goalSchema = new Schema(
    {
        // goal title
        // connection to the map?
        // post ref Post
        // username
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