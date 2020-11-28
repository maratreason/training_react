import React from 'react';
import classes from "./Paginator.module.css";

function Paginator({ totalUsersCount, pageSize, currentPage, onPageChanged }) {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={classes.pagination}>
            { 
                pages.map(page => {
                    return <span 
                        key={page} 
                        className={currentPage === page ? classes.selectedPage : ""}
                        onClick={(e) => onPageChanged(page)}
                    >{page}</span>
                })
            }
        </div>
    )
}

export default Paginator
