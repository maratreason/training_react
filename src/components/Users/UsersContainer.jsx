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
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return (
            <>
                { this.props.isFetching ? <Preloader /> : null }
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        );
    }
    
}

let mapStateToProps = (state) => {
    return {
        // users: getUsers(state),
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
        // thunk
        getUsers: getUsersThunkCreator 
        }
    )(UsersContainer)
);