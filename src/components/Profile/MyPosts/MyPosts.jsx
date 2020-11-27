import React from "react";
import { Field, reduxForm } from "redux-form";
import classes from "./MyPosts.module.css";
import { required, maxLengthCreator } from "../../../utils/validators/validators"
import Post from "./Post/Post";
import { Textarea } from "../../common/FormControls/FormControls";

const MyPosts = (props) => {

    let addNewPost = (values) => {
        props.addPost(values.addMyPost);
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <AddMyPostFormRedux onSubmit={addNewPost} />
            </div>
            <div className={classes.posts}>
                {
                    props.posts.map(el => <Post message={el.message} like={el.like} key={el.id} />)
                }
            </div>
        </div>
    );
}

const maxLength10 = maxLengthCreator(10);

const AddMyPost = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="addMyPost"
                    placeholder="Enter your post"
                    validate={[required, maxLength10]}
                />
            </div>
            <div><button>Send</button></div>
        </form>
    )
}

const AddMyPostFormRedux = reduxForm({form: "myPostForm"})(AddMyPost)

export default MyPosts;