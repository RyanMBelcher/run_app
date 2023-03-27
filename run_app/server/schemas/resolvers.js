const { AuthenticationError } = require('apollo-server-express');
const { User, Goal, Post, GoalDefinition } = require('../models');
const { signToken } = require('../utils/auth');
const turf = require('@turf/turf')

const resolvers = {
    Query: {
        // Get logged in user information
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({ username: context.user.username }).populate('goals').populate('posts').populate('followers').populate('following');
                return user;
            }
            throw new AuthenticationError('You must be logged in!');
        },
        getSingleUser: async (parent, { username }, context) => {
            const user = await User.findOne({ username }).populate('goals').populate('posts').populate('followers').populate('following');
            return user;
        },
        getAllUsers: async (parent, args) => {
            return await User.find({}).populate('goals').populate('posts').populate('followers');
        },
        getAllGoalDefinitions: async (parent, args, context) => {
            const goalDefinitions = await GoalDefinition.find({});

            return goalDefinitions;
        },
        getGoalByUser: async (parent, args, context) => {

            const goals = await Goal.find({ username: context.user.username }).populate('goalDefinition').populate('posts');

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
            const sortedPosts = posts.sort((a, b) => a.createdAt - b.createdAt);
            console.log('posts', posts)
            return sortedPosts;
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
                        location: args.location,
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
                    runValidators: true,
                }
            ).populate('comments');
            return comment;
        },

        deleteComment: async (parent, { commentId, postId }) => {
            return await Post.findOneAndUpdate(
                { _id: postId },
                { $pull: { comments: { _id: commentId } } },
                { new: true }
            ).populate('goalId');
        },

        toggleLikePost: async (parent, args, context) => {
            const like = await Post.findOne({ _id: args.postId });

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

            const followedUser = await User.findOneAndUpdate(
                { username: args.followUsername },
                {
                    $addToSet: {
                        followers: context.user._id
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('followers');

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $addToSet: {
                        following: followedUser._id
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
            const goalDefinition = await GoalDefinition.findOne({
                _id: args.goalDefinitionId,
            });

            const goal = await Goal.create({
                startDate: new Date(),
                endDate: null,
                status: "in progress",
                currentLocation: goalDefinition.start,
                currentDistance: 0,
                username: context.user.username,
                goalDefinition: goalDefinition._id
            });


            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
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
            return updatedUser;
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
            const currentGoal = await Goal.findOne({ _id: postInfo.goalId }).populate('goalDefinition');
            console.log(currentGoal);
            console.log('current location', currentGoal.currentLocation);
            const path = turf.lineString(currentGoal.goalDefinition.coordinates);
            const newCurrentDistance = currentGoal.currentDistance + postInfo.distance;
            const percentageDone = newCurrentDistance / currentGoal.goalDefinition.distance;
            console.log('percentageDone', percentageDone);
            const alongPath = turf.along(path, newCurrentDistance, { options: 'miles' });
            console.warn('alongPath', alongPath);
            const newCurrentLocation = alongPath.geometry.coordinates;
            console.log('new current location', newCurrentLocation);
            const post = await Post.create({
                title: postInfo.title,
                description: postInfo.description,
                distance: postInfo.distance,
                image: postInfo.image,
                username: context.user.username,
                userId: context.user._id,
                goalId: postInfo.goalId
            });

            const updatedGoal = await Goal.findOneAndUpdate(
                { _id: postInfo.goalId },
                {
                    $addToSet: {
                        posts: post
                    },
                    $set:
                    {
                        currentDistance: newCurrentDistance,
                        currentLocation: newCurrentLocation
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

            const updatedGoal = await Goal.findOneAndUpdate(
                { _id: post.goalId._id },
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
                        location: args.location,
                        image: args.postImage,
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
    },
};

module.exports = resolvers;