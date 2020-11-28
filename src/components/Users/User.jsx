import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Users.module.css";

function User({ user, followingInProgress, unfollow, follow }) {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={`/profile/${user.id}`}>
                        <img
                            className={classes.userPhoto}
                            src={
                                user.photos.small != null
                                    ? user.photos.small
                                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Dmitry_Nagiev_2017_4.jpg/274px-Dmitry_Nagiev_2017_4.jpg"
                            }
                            alt=""
                        />
                    </NavLink>
                </div>
                <div>
                    {user.followed ? (
                        <button
                            disabled={followingInProgress.some((id) => id === user.id)}
                            onClick={() => unfollow(user.id)}
                        >
                            Unfollow
                        </button>
                    ) : (
                        <button
                            disabled={followingInProgress.some((id) => id === user.id)}
                            onClick={() => follow(user.id)}
                        >
                            Follow
                        </button>
                    )}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
            </span>
        </div>
    );
}

export default User;
