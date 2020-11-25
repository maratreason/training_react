import React from "react"
import classes from "./Post.module.css"

const Post = (props) => {
    return (
        <div className={classes.item}>
            <img src='http://img0.joyreactor.com/pics/post/demotivation-posters-auto-mr-bean-avatar-%28movie%29-309908.jpeg' alt=""/>
            {props.message}
            <div>
                <span>like: {props.like}</span>
            </div>
        </div>
    )
}

export default Post;