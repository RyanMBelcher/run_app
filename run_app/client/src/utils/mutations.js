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

// export const EDIT_PROFILE = gql`
//     mutation editProfile($bio: String, $profileImage: String, $username: String) {
//         editProfile(bio: $bio, profileImage: $profileImage, username: $username) {
//             _id
//             username
//             bio
//             profileImage
//         }
//     }
// `;

// export const ADD_FOLLOWER = gql`
//     mutation addFollower($userId: String, $followUsername: String) {
//         addFollower(userId: $userId, followUsername: $followUsername) {
//             _id
//             username
//             followers {
//                 _id
//                 username
//             }
//             followerCount
//         }
//     }
//  `;

// export const REMOVE_FOLLOWER = gql`
//     mutation removeFollower($userID: String, $blockUsername: String) {
//         removeFollower(userId: $userId, blockUsername: $blockUsername) {
//             _id
//             username
//             followers {
//                 _id
//                 username
//             }
//             followerCount
//         }
//     }
//  `;

// // export const ADD_GOAL = gql`

// //  `;

// export const ADD_POST = gql`
//     mutation addPost($postInfo: AddPostInfo) {
//         addPost(postInfo: $postInfo) {
//             _id
//             title
//             description
//         }
//     }
//  `;

// export const ADD_COMMENT = gql`
//     mutation addComment($text: String!, $username: String!, $postId: String) {
//         addComment(text: $text, username: $username, postId: $postId) {
//             _id
//             username
//             title
//             description
//             image
//             likes {
//                 _id
//             }
//             comments {
//                 _id
//                 text
//                 username
//                 createdAt
//             }
//             createdAt
//         }
//     }
//  `;

// // export const DELETE_GOAL = gql`

// //  `;

// export const DELETE_POST = gql`
//     mutation deletePost($postId: String!) {
//         deletePost(postId: $postId) {
//             _id
//             title
//         }
//     }
//  `;

// export const DELETE_COMMENT = gql`
//     mutation deleteComment($commentId: String!, $postId: String!) {
//         deleteComment(commentId: $commentId, postId: $postID) {
//             _id
//             username
//             title
//             description
//             image
//             likes {
//                 _id
//             }
//             comments {
//                 _id
//                 createdAt
//                 text
//             }
//             createdAt
//             tripId {
//                 _id
//                 location
//             }
//         }
//     }
//  `;

// export const EDIT_POST = gql`
//     mutation editPost($postId: String, $title: String, $description: String) {
//         editPost(postId: $postId, title: $title, description: $description) {
//             _id
//             title
//             description
//             username
//         }
//     }
//  `;