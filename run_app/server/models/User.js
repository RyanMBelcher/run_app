const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// username
// email
// password
// bio

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
        profileImage: {
            type: String,
        }
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
}

module.exports = User;