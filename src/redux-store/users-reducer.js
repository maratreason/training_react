import { UsersAPI } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(el => {
                    if (el.id === action.payload) {
                        return {
                            ...el,
                            followed: true
                        }
                    }
                    return el;
                })
            };

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(el => {
                    if (el.id === action.payload) {
                        return {
                            ...el,
                            followed: false
                        }
                    }
                    return el;
                })
            };

        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload }
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.payload }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.payload }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return { 
                ...state, 
                followingInProgress: action.isFetching 
                    ? [...state.followingInProgress, action.userId] // дописываем id
                    : state.followingInProgress.filter(id => id !== action.userId) // вернет новый массив
            }
        default:
            return state;
    }
}

export const followSuccess = (id) => ({type: FOLLOW, payload: id});
export const unfollowSuccess = (id) => ({type: UNFOLLOW, payload: id});
export const setUsers = (users) => ({type: SET_USERS, payload: users});
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, payload: page});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, payload: totalUsersCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, payload: isFetching});
export const toggleFollowingInProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});

// Делаем thunk
// Функция возвращает функцию.
export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        UsersAPI.getUsers(currentPage, pageSize).then(response => {
            dispatch(setTotalUsersCount(response.totalCount));
            dispatch(setUsers(response.items));
            dispatch(toggleIsFetching(false));
        });
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingInProgress(true, userId));
        UsersAPI.unfollow(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowSuccess(userId));
            }
            dispatch(toggleFollowingInProgress(false, userId));
        });
    }
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingInProgress(true, userId));
        UsersAPI.follow(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(followSuccess(userId));
            }
            dispatch(toggleFollowingInProgress(false, userId));
        });
    }
}

export default usersReducer;