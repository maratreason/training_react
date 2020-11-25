import { AuthAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {

    switch(action.type) {
        case SET_USER_DATA: 
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login) => ({type: SET_USER_DATA, payload: {userId, email, login}});

// thunk
export const setAuthThunkCreator = () => {
    return (dispatch) => {
        AuthAPI.me().then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(data.data.id, data.data.email, data.data.login));
            }
        });
    }
}

export default authReducer;