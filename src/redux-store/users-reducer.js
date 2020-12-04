import { UsersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    page: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload, "id", { followed: true })
            };

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload, "id", { followed: false })
            };

        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case SET_CURRENT_PAGE:
            return { ...state, page: action.payload }
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
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage));

        const response = await UsersAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setTotalUsersCount(response.data.totalCount));
        dispatch(setUsers(response.data.items));
    }
}

// Функция для рефакторинга foolow и unfollow
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingInProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingInProgress(false, userId));
}


export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, UsersAPI.unfollow.bind(UsersAPI), unfollowSuccess);
    }
}

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, UsersAPI.follow.bind(UsersAPI), followSuccess);
    }
}

export default usersReducer;