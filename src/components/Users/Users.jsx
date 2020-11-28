import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import classes from "./Users.module.css";

function Users({ totalUsersCount, pageSize, currentPage, onPageChanged, unfollow, follow, users, followingInProgress }) {
    return (
        <div className={classes.users}>
            {
                users.map(
                    el => <User 
                        user={el}
                        key={el.id}
                        followingInProgress={followingInProgress}
                        follow={follow}
                        unfollow={unfollow}
                    />
                )
            }
            <Paginator
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
            />
        </div>
    );
    
}

export default Users;