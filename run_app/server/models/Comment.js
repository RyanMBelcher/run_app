const { Schema } = require('mongoose');
const dayjs = require('dayjs');

const commentSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
            trim: true
        },
        username: {
            type: String
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatTimestamp
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

function formatTimestamp(time) {
    return dayjs(time).format('MMM D, YYYY [at] h:mm A');
};

module.exports = commentSchema