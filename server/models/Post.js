const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');
const commentSchema = require('./Comment');

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        distance: {
            type: Number,
            required: true
        },
        image: {
            type: String
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        comments: [commentSchema],
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatTimestamp
        },
        username: {
            type: String
        },
        goalId: {
            type: Schema.Types.ObjectId,
            ref: 'Goal'
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },

    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
        timestamps: {
            createdAt: 'created_at'
        }
    }
);

function formatTimestamp(time) {
    return dayjs(time).format('MMM D, YYYY [at] h:mm A');
};

postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

postSchema.virtual('likesCount').get(function () {
    return this.likes.length;
});

const Post = model('Post', postSchema);

module.exports = Post;