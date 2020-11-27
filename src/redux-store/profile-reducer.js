import { ProfileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET_STATUS';

const initialState = {
    posts: [
        {id: 1, message: 'How are you', like: 5},
        {id: 2, message: 'Its my post 2', like: 10},
        {id: 3, message: 'Post 3', like: 15},
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        id: state.posts.length + 1,
                        message: action.payload,
                        like: 0
                    }
                ],
            }
        case SET_USER_PROFILE: 
            return {
                ...state,
                profile: action.payload
            }
        case SET_STATUS: 
            return {
                ...state,
                status: action.payload
            }
        default:
            return state;
    }
}

export const addPostActionCreator = (post) => ({type: ADD_POST, payload: post});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, payload: profile});
export const setStatus = (status) => ({type: SET_STATUS, payload: status});

// thunk
export const setUserProfileThunkCreator = (userId) => {
    return (dispatch) => {
        ProfileAPI.getProfile(userId).then(data => {
            dispatch(setUserProfile(data));
        });
    }
}
// thunk
export const getStatus = (userId) => {
    return (dispatch) => {
        ProfileAPI.getStatus(userId).then(response => {
            dispatch(setStatus(response));
        });
    }
}

export const updateStatusUser = (status) => (dispatch) => {
    ProfileAPI.updateStatus(status).then(data => {
        dispatch(setStatus(data));
    });
}

export default profileReducer;