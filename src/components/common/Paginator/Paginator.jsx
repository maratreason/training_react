import React, { useState } from 'react';
import classes from "./Paginator.module.css";

function Paginator({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize }) {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={classes.pagination}>
            {
                portionNumber > 1 && 
                <button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>
            }
            { 
                pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(page => {
                        return <span 
                            key={page} 
                            className={currentPage === page ? classes.selectedPage : ""}
                            onClick={(e) => onPageChanged(page)}
                        >{page}</span>
                    })
            }
            {
                portionCount > portionNumber && 
                <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>
            }
        </div>
    )
}

export default Paginator
