import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const EDIT_PROFILE = gql`
    mutation editProfile($bio: String, $location: String $profileImage: String, $username: String) {
        editProfile(bio: $bio, location: $location, profileImage: $profileImage, username: $username) {
            _id
            username
            bio
            location
            profileImage
        }
    }
`;

export const ADD_FOLLOWER = gql`
    mutation addFollower($userId: String, $followUsername: String) {
        addFollower(userId: $userId, followUsername: $followUsername) {
            _id
            username
            followers {
                _id
                username
            }
            followerCount
        }
    }
 `;

export const REMOVE_FOLLOWER = gql`
    mutation removeFollower($userID: String, $blockUsername: String) {
        removeFollower(userId: $userId, blockUsername: $blockUsername) {
            _id
            username
            followers {
                _id
                username
            }
            followerCount
        }
    }
 `;

export const ADD_POST = gql`
    mutation addPost($postInfo: AddPostInfo) {
        addPost(postInfo: $postInfo) {
            _id
            title
            description
            distance
            image
            goalId {
                _id
            }
        }
    }
 `;

export const ADD_COMMENT = gql`
    mutation addComment($text: String!, $username: String, $postId: String!) {
        addComment(text: $text, username: $username, postId: $postId) {
            _id
            username
            title
            description
            image
            likes {
                _id
            }
            comments {
                _id
                text
                username
                createdAt
            }
            createdAt
        }
    }
 `;

export const ADD_GOAL = gql`
    mutation addGoal($goalDefinitionId: String) {
        addGoal(goalDefinitionId: $goalDefinitionId) {
            _id
            username
        }
    }
 `

// export const DELETE_GOAL = gql`
//     mutation deleteGoal($goalId: String!, $username: String) {
//         _id
//         username
//         location
//         posts {
//             _id
//         }
//         postCount
//     }
//  `;

export const DELETE_POST = gql`
    mutation deletePost($postId: String!) {
        deletePost(postId: $postId) {
            _id
            title
        }
    }
 `;

export const DELETE_COMMENT = gql`
    mutation deleteComment($commentId: String!, $postId: String!) {
        deleteComment(commentId: $commentId, postId: $postId) {
            _id
            username
            title
            description
            image
            likes {
                _id
            }
            comments {
                _id
                createdAt
                text
            }
            createdAt
            goalId {
                _id
            }
        }
    }
 `;

export const EDIT_POST = gql`
    mutation editPost($postId: String, $title: String, $description: String, $postImage: String) {
        editPost(postId: $postId, title: $title, description: $description, postImage: $postImage) {
            _id
            title
            description
            image
            username
        }
    }
 `;

export const TOGGLE_LIKE_POST = gql`
    mutation toggleLikePost($postId: String, $userId: String) {
        toggleLikePost(postId: $postId, userId: $userId) {
            _id
            username
            likes {
                _id
                username
            }
            likesCount
            userId {
                _id
            }
            goalId {
                _id
            }
        }
    }
`;