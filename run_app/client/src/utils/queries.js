import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me($username: String) {
        me(username: $username) {
            _id
            username
            email
            bio
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
            goalCount
            postCount
            followerCount
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
            followerCount
        }
    }
`;

export const GET_SINGLE_GOAL = gql`
    query getSingleGoal($goalId: String!) {
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

export const GET_GOALS_BY_USER = gql`
    query getGoalsByUser($username: String) {
        getGoalsByUser(username: $username) {
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
`
