const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        password: String
        bio: String
        profileImage: String
        goals: [Goal]
        followers: [User]
        goalCount: Int
        postCount: Int
        followerCount: Int
    }

    type Goal {
        _id: ID!
        startDate: String
        endDate: String
        status: String
        currentLocation: [Float]
        currentDistance: Float
        user: [User]
        goal: [GoalDefinition]
    }

    type GoalDefinition {
        _id: ID!
        start: [Float]
        end: [Float]
        coordinates: [[Float]]
        distance: Float
    }

    type Post {
        _id: ID!
        title: String
        description: String
        image: String
        likes: [User]
        likesCount: Int
        createdAt: String
        username: String
        userId: User
        tripId: Trip
    }

    type Comment {
        _id: ID!
        text: String
        username: String
        postId: Post
        createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input AddPostInfo {
        title: String
        description: String
        image: String
        username: String
        userId: String
        tripId: String
    }

    type Query {
        me(username: String!): User
        getSingleUser(username: String!): User
        getAllUsers: [User]
        getGoalsByUser(username: String): [Goal]
        getSingleGoal(goalId: String): Goal
        getAllPosts: [Post]
        getPostByUser(username: String!): [Post]
        getSinglePost(postId: String!): Post
        getCommentsOnPost(postId: String!): [User]
        getUsersFollowers(username: String!): [User]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        editProfile(username: String, bio: String, profileImage: String): User
        addFollower(followUsername: String, userId: String): User
        removeFollower(blockUsername: Sting, userId: Sting): User
        addGoal
        deleteGoal
        addPost(postInfo: AddPostInfo): Post
        deletePost(postId: String!, username: String): Post
        editPost(postId: String, title: String, description: String, postImage: String): Post
        addComment(text: String!, username: String, postId: String!): Post
        deleteComment(commentId: String!, postId: String!): Post
        toggleLikePost(postId: Sting, userId: String): Post
    }
`

module.exports = typeDefs;