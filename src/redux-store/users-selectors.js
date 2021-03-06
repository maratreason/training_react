import { createSelector } from "reselect";

// Селекторы ################################ С помощью библиотеки reselect.
export const getUsersSelector = (state) => {
    return state.usersPage.users;
}
export const getUsers = createSelector(getUsersSelector,
    (users) => {
    return users;
});
// ##########################################

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.page;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}