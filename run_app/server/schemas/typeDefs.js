const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        password: String
        bio: String
        location: String
        profileImage: String
        goals: [Goal]
        posts: [Post]
        followers: [User]
        following: [User]
        goalCount: Int
        postCount: Int
        followerCount: Int
        followingCount: Int
    }

    type Goal {
        _id: ID!
        startDate: String
        endDate: String
        status: String
        currentLocation: [Float]
        currentDistance: Float
        username: String
        goalDefinition: GoalDefinition
        posts: [Post]
    }

    type GoalDefinition {
        _id: ID!
        title: String
        start: [Float]
        end: [Float]
        coordinates: [[Float]]
        distance: Float
    }

    type Post {
        _id: ID!
        title: String
        description: String
        distance: Int
        image: String
        likes: [User]
        likesCount: Int
        comments: [Comment]
        commentCount: Int
        createdAt: String
        username: String
        userId: User
        goalId: Goal
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
        goalId: String
    }

    type Query {
        me(username: String): User
        getSingleUser(username: String!): User
        getAllUsers: [User]
        getGoalByUser(username: String): [Goal]
        getSingleGoal(goalId: String): Goal
        getAllGoalDefinitions: [GoalDefinition]
        getAllPosts: [Post]
        getPostByUser(username: String!): [Post]
        getSinglePost(postId: String!): Post
        getComments(postId: String!): [User]
        getFollowers(username: String!): [User]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        editProfile(username: String, bio: String, location: String, profileImage: String): User
        addFollower(followUsername: String, userId: String): User
        removeFollower(blockUsername: String, userId: String): User
        addGoal(goalDefinitionId: String): Goal
        deleteGoal(goalId: String!, username: String): Goal
        addPost(postInfo: AddPostInfo): Post
        deletePost(postId: String!, username: String): Post
        editPost(postId: String, title: String, description: String, postImage: String): Post
        addComment(text: String!, username: String, postId: String!): Post
        deleteComment(commentId: String!, postId: String!): Post
        toggleLikePost(postId: String, userId: String): Post
    }
`

module.exports = typeDefs;