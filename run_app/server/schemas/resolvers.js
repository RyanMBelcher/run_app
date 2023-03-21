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
        getSingleUser: async (parent, { username }, context) => {
            const user = await User.findOne({ username }).populate('goals').populate('posts').populate('followers');
            return user;
        },
        getAllUsers: async (parent, args) => {
            return await User.find({}).populate('goals').populate('posts').populate('followers');
        },
        getGoalByUser: async (parent, args, context) => {
            const goals = await Goal.find({ username: context.user.username }).populate('posts');
            return goals;
        },
        getSingleGoal: async (parent, args, context) => {
            const goal = await Goal.findOne({ _id: goalId }).populate('goals');
            return goal;
        },
        getAllPosts: async (parent, args) => {
            const posts = await Post.find({}).populate('comments').populate('goalId').populate('userId').populate('likes');
            const sortedPosts = posts.sort((a, b) => a.createdAt - b.createdAt);
            return sortedPosts;
        },
        getPostByUser: async (parent, { username }) => {
            const posts = await Post.find({ username }).populate('comments').populate('goalId');
            return posts;
        },
        getSinglePost: async (parent, { postId }) => {
            const post = await Post.findOne({ _id: postId }).populate('comments').populate('goalId');
            return post;
        },
        getComments: async (parent, { postId }) => {
            const comments = await Post.findOne({ _id: postId }).populate('comments');
            return comments;
        },
        getFollowers: async (parent, { username }) => {
            const user = await User.findOne({ username }).populate('followers');
            return user;
        }
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
        },

        editProfile: async (parent, args, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { username: args.username || context.user.username },
                {
                    $set:
                    {
                        bio: args.bio,
                        profileImage: args.profileImage
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
            return updatedUser;
        },

        addComment: async (parent, args, context) => {
            const comment = await Post.findOneAndUpdate(
                { _id: args.postId },
                {
                    $addToSet: {
                        comments: {
                            text: args.text,
                            username: args.username || context.user.username,
                            postId: args.postId
                        }
                    }
                },
                {
                    new: true,
                    runValidators: true.
                }
            ).populate('comments');
            return comment;
        },

        deleteComment: async (parent, { commentId, postId }) => {
            return await Post.findOneAndUpdate(
                { _id: postId },
                { $pull: { comments: { _id: commentId } } },
                { new: true }
            ).populate('tripId');
        },

        toggleLikePost: async (parent, args, context) => {
            const like = await Post.findOneAndUpdate({ _id: args.postId });

            if (like.likes.includes(context.user._id)) {
                return await Post.findOneAndUpdate(
                    { _id: args.postId },
                    {
                        $pull: {
                            likes: args.userId || context.user._id
                        }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                ).populate('likes')
            } else {
                return await Post.findOneAndUpdate(
                    { _id: args.postId },
                    {
                        $addToSet: {
                            likes: args.userId || context.user._id
                        }
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                ).populate('likes');
            }
        },

        addFollower: async (parent, args, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { username: args.userId || context.userId },
                {
                    $addToSet: {
                        followers: args.userId || context.user._id
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('followers');
            return updatedUser;
        },

        removeFollower: async (parent, args, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { username: args.blockUsername },
                {
                    $pull: {
                        followers: args.userId || context.user._id
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('followers');
            return updatedUser;
        },

        addGoal: async (parent, args, context) => {

            const goal = await Goal.create({
                startDate: args.startDate,
                endDate: args.endDate,
                status: args.status,
                currentLocation: args.currentLocation,
                currentDistance: args.currentDistance,
                username: args.username
            });

            const updatedUser = await User.findOneAndUpdate(
                { username: args.username || context.user.username },
                {
                    $addToSet: {
                        goals: goal
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('goals');
            return goal;
        },

        deleteGoal: async (parent, args, context) => {
            const goal = await Goal.findOneAndDelete({ _id: args.goalId });

            const updatedUser = await User.findOneAndUpdate(
                { username: args.username || context.user.username },
                { $pull: { goals: { _id: args.goalsId } } },
                { new: true }
            ).populate('goals');

            return goal;
        },

        addPost: async (parent, { postInfo }, context) => {
            const post = await Post.create({
                title: postInfo.title,
                description: postInfo.description,
                username: postInfo.username || context.user.username,
                userId: postInfo.userId || context.user._id,
                goalId: postInfo.goalId
            });

            const updatedGoal = await Goal.findOneAndUpdate(
                { _id: postInfo.tripId },
                {
                    $addToSet: {
                        posts: post
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

            const updatedUser = await User.findOneAndUpdate(
                { username: postInfo.username || context.user.username },
                {
                    $addToSet: {
                        posts: post
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            )

            return post;
        },

        deletePost: async (parent, args, context) => {
            const post = await Post.findOneAndDelete({ _id: args.postId });

            const updatedTrip = await Trip.findOneAndUpdate(
                { _id: post.tripId._id },
                {
                    $pull: { posts: { _id: args.postId } },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

            const updatedUser = await User.findOneAndUpdate(
                { username: args.username || context.user.username },
                {
                    $pull: { posts: { _id: args.postId } },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

            return post;
        },

        editPost: async (parent, args, context) => {
            const updatedPost = await Post.findOneAndUpdate(
                { _id: args.postId },
                {
                    $set:
                    {
                        title: args.title,
                        description: args.description,
                        userId: context.user._id
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('userId');

            return updatedPost;
        },

        addComment: async (parent, args, context) => {
            const post = await Post.findOneAndUpdate(
                { _id: args.postId },
                {
                    $addToSet: {
                        comments: {
                            text: args.text,
                            username: args.username || context.user.username,
                            postId: args.postid
                        }
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('comments');
            return post
        },

        deleteComment: async (parent, { commentId, postId }) => {
            return await Post.findOneAndUpdate(
                { _id: postId },
                { $pull: { comments: { _id: commentId } } },
                { new: true }
            ).populate('goalId')
        },

        likePost: async (parent, args, context) => {
            const post = await Post.findOne({ _id: args.postId });
            if (post.likes.includes(context.user._id)) {
                return await Post.findOneAndUpdate(
                    { _id: args.postId },
                    {
                        $pull: {
                            likes: args.userId || context.user._id
                        }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                ).populate('likes');
            } else {
                return await Post.findOneAndUpdate(
                    { _id: args.postId },
                    {
                        $addToSet: {
                            likes: args.userId || context.user._id
                        }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                ).populate('likes');
            }
        }
    },
};

module.exports = resolvers;