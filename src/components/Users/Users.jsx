import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Users.module.css";

function Users(props) {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            {
                props.users.map(el => {
                    return (
                        <div key={el.id} className={classes.users}>
                            <span>
                                <div>
                                    <NavLink to={`/profile/${el.id}`}>
                                        <img className={classes.userPhoto}
                                            src={el.photos.small != null 
                                                ? el.photos.small 
                                                : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Dmitry_Nagiev_2017_4.jpg/274px-Dmitry_Nagiev_2017_4.jpg"
                                            } 
                                            alt=""
                                        />
                                    </NavLink>
                                </div>
                                <div>
                                    { el.followed
                                        ? <button disabled={props.followingInProgress.some(id => id === el.id)} 
                                            onClick={() => props.unfollow(el.id) }
                                          >Unfollow</button>
                                        : <button disabled={props.followingInProgress.some(id => id === el.id)}
                                            onClick={() => props.follow(el.id) }
                                          >Follow</button>
                                    }
                                    
                                </div>
                            </span>
                            <span>
                                <span>
                                    <div>{el.name}</div>
                                    <div>{el.status}</div>
                                </span>
                            </span>
                        </div>
                    )
                })
            }
            <div className={classes.pagination}>
                { 
                    pages.map(page => {
                        return <span 
                            key={page} 
                            className={props.currentPage === page ? classes.selectedPage : ""}
                            onClick={(e) => props.onPageChanged(page)}
                        >{page}</span>
                    })
                }
            </div>
        </div>
    );
    
}

export default Users;