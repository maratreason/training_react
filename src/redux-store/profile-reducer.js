import { stopSubmit } from "redux-form";
import { ProfileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS';

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
        case DELETE_POST: 
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.payload)
            }
        case SAVE_PHOTO_SUCCESS: 
            return {
                ...state,
                profile: action.payload
            }
        case SAVE_PROFILE_SUCCESS: 
            return {
                ...state,
                profile: {...state.profile, photos: action.payload}
            }
        default:
            return state;
    }
}

export const addPostActionCreator = (post) => ({type: ADD_POST, payload: post});
export const deletePost = (id) => ({type: DELETE_POST, payload: id});

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, payload: profile});
export const setStatus = (status) => ({type: SET_STATUS, payload: status});

export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, payload: photos});
export const saveProfileSuccess = (profile) => ({type: SAVE_PROFILE_SUCCESS, payload: profile});


// thunk
export const setUserProfileThunkCreator = (userId) => async (dispatch) => {
    const response = await ProfileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}
// thunk
export const getStatus = (userId) => async (dispatch) => {
    let response = await ProfileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatusUser = (status) => async (dispatch) => {
    let response = await ProfileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await ProfileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let response = await ProfileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(setUserProfileThunkCreator(userId));
    } else {
        // let fieldName = response.data.messages[0].split("->")[1].split(")")[0];
        // dispatch(stopSubmit("edit-profile", {"contacts": { [fieldName] : " некорректно заполнено" } }));
        dispatch(stopSubmit("edit-profile", { _error : response.data.messages[0] } ));
    }
}

export default profileReducer;