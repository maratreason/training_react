import React from "react";
import { reduxForm } from "redux-form";
import classes from "./ProfileInfo.module.css";
import { createField, Input, Textarea } from "../../common/FormControls/FormControls";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {

    return (
        <form onSubmit={handleSubmit}>
            <div><button>Save</button></div>
            {
                error && <div style={{ color: 'red', padding: 10, backgroundColor: 'rosybrown' }}>{ error }</div>
            }
            <div>
                <b>Full name</b>: {createField("Full Name", "fullName", Input, [])}
            </div>
            <div>
                <b>Looking for a job</b>: {createField("", "lookingForAJob", Input, [], {type: "checkbox"})}
            </div>

            <div>
                <b>My professional skills</b>: 
                {createField("My professional skills", "lookingForAJobDescription", Textarea, [])}
            </div>

            <div>
                <b>About me</b>: {createField("About Me", "aboutMe", Textarea, [])}
            </div>

            <div>
                <b>Contacts</b>:
                {Object.keys(profile.contacts).map((key) => {
                    return <div className={classes.contact} key={key}>
                        <b>{key}</b>: {createField(key, "contacts." + key, Input, [])}
                    </div>;
                })}
            </div>
        </form>
    );
};

const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile" })(ProfileDataForm);

export default ProfileDataFormReduxForm;