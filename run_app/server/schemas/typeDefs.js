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
    }

    type Goal {
        _id: ID!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me(username: String!): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }
`

module.exports = typeDefs;