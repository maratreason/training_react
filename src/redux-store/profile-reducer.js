import { UsersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';

const initialState = {
    posts: [
        {id: 1, message: 'How are you', like: 5},
        {id: 2, message: 'Its my post 2', like: 10},
        {id: 3, message: 'Post 3', like: 15},
    ],
    newPostText: 'it-kamasutra.com',
    profile: null
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
                        message: state.newPostText,
                        like: 0
                    }
                ],
                newPostText: ''
            }
        case UPDATE_NEW_POST_TEXT: 
            return {
                ...state,
                newPostText: action.payload
            }
        case SET_USER_PROFILE: 
            return {
                ...state,
                profile: action.payload
            }
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, payload: text});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, payload: profile});

// thunk
export const setUserProfileThunkCreator = (userId) => {
    return (dispatch) => {
        UsersAPI.getProfile(userId).then(data => {
            dispatch(setUserProfile(data));
        });
    }
}

export default profileReducer;