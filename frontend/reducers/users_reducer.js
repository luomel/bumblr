import{
    RECEIVE_FOLLOWERS,
    RECEIVE_FOLLOW,
    REMOVE_FOLLOW
} from "../actions/follow_actions";

import {
    RECEIVE_USER_LIKES,
    RECEIVE_LIKE,
    REMOVE_LIKE
} from "../actions/like_actions";

import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

import { RECEIVE_ALL_USERS } from "../actions/user_actions";

const usersReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState);
    switch(action.type) {
        case RECEIVE_ALL_USERS:
            return Object.assign({}, newState, action.users);
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, newState, { [action.currentUser.id]: action.currentUser });
        case RECEIVE_FOLLOWERS:
            return action.followers;
        case RECEIVE_FOLLOW:
            let currentUserId = action.follow.follower_id;
            let followeeId = action.follow.followee_id;
            newState[currentUserId].following.push(followeeId);
            newState[followeeId].followers.push(currentUserId);
            return newState;
        case REMOVE_FOLLOW:
            currentUserId = action.follow.follower_id;
            followeeId = action.follow.followee_id;
            const index = newState[currentUserId].following.indexOf(followeeId);
            newState[currentUserId].following.splice(index, 1);
            const index2= newState[followeeId].followers.indexOf(currentUserId);
            newState[followeeId].followers.splice(index2, 1);
            return newState;
        case RECEIVE_USER_LIKES:
            return action.likes;
        case RECEIVE_LIKE:
            let user = action.like.user_id;
            let post = action.like.post_id;
            newState[user].likes.push(post);
            return newState;
        case REMOVE_LIKE:
            user = action.like.user_id;
            post = action.like.post_id;
            const index3 = newState[user].likes.indexOf(post);
            newState[user].likes.splice(index3, 1);
            return newState;
        default:
            return oldState;
    }
};

export default usersReducer;