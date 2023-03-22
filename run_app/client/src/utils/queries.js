import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me($username: String) {
        me(username: $username) {
            _id
            username
            email
            bio
            location
            profileImage
            goals {
                _id
                posts {
                    _id
                }
            }
            posts {
                _id
                title
            }
            followers {
                _id
                username
            }
            following {
                _id
                username
            }
            goalCount
            postCount
            followerCount
            followingCount
        }
    }
`;

export const GET_SINGLE_USER = gql`
    query getSingleUser($username: String!) {
        getSingleUser(username: $username) {
            _id
            username
            email
            bio
            location
            profileImage
            goals {
                _id
            }
            goalCount
            posts {
                _id
            }
            postCount
            followers {
                _id
                username
            }
            following {
                _id
                username
            }
            followerCount
            followingCount
        }
    }
`;

export const GET_SINGLE_GOAL = gql`
    query getSingleGoal($goalId: String) {
        getSingleGoal(goalId: $goalId) {
            _id
            startDate
            endDate
            status
            currentLocation
            currentDistance
            username
            goalDef {
                _id
            }
        }
    }
`;

export const GET_GOAL_BY_USER = gql`
    query getGoalByUser($username: String) {
        getGoalByUser(username: $username) {
            _id
            startDate
            endDate
            status
            currentLocation
            currentDistance
            username
            goalDef {
                _id
            }
        }
    }
`;

export const GET_ALL_POSTS = gql`
    query getAllPosts {
        getAllPosts {
            _id
            username
            title
            description
            distance
            likes {
                _id
                username
            }
            likesCount
            goalId {
                _id
            }
            comments {
                _id
                username
                text
                postId {
                    _id
                }
                createdAt
            }
            commentCount
            createdAt
            userId {
                _id
                username
                profileImage
            }
        }
    }
`;