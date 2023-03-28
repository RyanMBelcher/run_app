const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        bio: {
            type: String,
        },
        location: {
            type: String
        },
        profileImage: {
            type: String,
        },
        goals: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Goal'
            }
        ],
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('goalCount').get(function () {
    return this.goals.length;
});

userSchema.virtual('postCount').get(function () {
    return this.posts.length;
});

userSchema.virtual('followerCount').get(function () {
    return this.followers.length;
});

userSchema.virtual('followingCount').get(function () {
    return this.following.length;
});

const User = model('User', userSchema);

module.exports = User;