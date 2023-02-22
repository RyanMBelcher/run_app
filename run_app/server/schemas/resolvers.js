const { AuthenticationError } = require('apollo-server-express');
const { User, Goal, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Get logged in user information
        me: async (parent, args, context) => {
            if (context.user || args.user) {
                const user = await User.findOne({ username: args.username || context.user.username }).populate('goals').populate('posts').populate('followers');
                return user;
            }
            throw new AuthenticationError('You must be logged in!');
        },
        // getSingleUser
        // getAllUsers
        // getGoalByUser
        // getSingleGoal
        // getAllPosts
        // getPostByUser
        // getPostByGoal
        // getSinglePost
        // getComment
        // getFollowers
        getSingleUser: async (parent, { username }, context) => {
            const user = await User.findOne({ username }).populate('goals').populate('posts').populate('followers');
            return user;
        },
        getAllUsers: async (parent, args) => {
            return await User.find({}).populate('goals').populate('posts').populate('followers');
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        }
    },
};

module.exports = resolvers;