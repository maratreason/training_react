import React, {Component} from "react";
import { connect } from "react-redux";
import { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, 
    toggleIsFetching, toggleFollowingInProgress, getUsersThunkCreator } from "../../redux-store/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import { getPageSize, getTotalUsersCount, getCurrentPage, 
    getIsFetching, getFollowingInProgress, getUsers } from "../../redux-store/users-selectors";

class UsersContainer extends Component {
    componentDidMount() {
        // это callback thunk-а
        const { getUsers, currentPage, pageSize } = this.props;
        getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber, pageSize) => {
        const { getUsers, setCurrentPage } = this.props;
        setCurrentPage(pageNumber);
        getUsers(pageNumber, pageSize);
    }

    render() {
        const { isFetching, totalUsersCount, pageSize, currentPage, users, follow, unfollow, followingInProgress } = this.props;
        return (
            <>
                { isFetching ? <Preloader /> : null }
                <Users
                    totalUsersCount={totalUsersCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChanged={this.onPageChanged}
                    users={users}
                    follow={follow}
                    unfollow={unfollow}
                    followingInProgress={followingInProgress}
                />
            </>
        );
    }
    
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

// сокращаем это в connect
// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (id) => {
//             dispatch(followAC(id));
//         },
//         unfollow: (id) => {
//             dispatch(unfollowAC(id));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (page) => {
//             dispatch(setCurrentPageAC(page))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetching(isFetching))
//         }
//     }
// }

// hoc
// let withRedirect = withAuthRedirect(UsersContainer);

// export default connect(
//     mapStateToProps, 
//     { follow, unfollow, setUsers, 
//       setCurrentPage, setTotalUsersCount, toggleIsFetching, 
//       toggleFollowingInProgress, 
//       // thunk
//       getUsers: getUsersThunkCreator 
//     })(withRedirect);


export default compose(
    //withAuthRedirect, // удалить withAuthRedirect чтобы убрать защиту isAuth.
    connect( mapStateToProps, { 
        follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleFollowingInProgress, 
        getUsers: getUsersThunkCreator 
    })(UsersContainer)
);