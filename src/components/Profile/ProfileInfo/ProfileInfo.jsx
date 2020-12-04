import React, { useState } from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

    const [editMode, setEditMode] = useState(false);

    const NagievPhoto =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Dmitry_Nagiev_2017_4.jpg/274px-Dmitry_Nagiev_2017_4.jpg";

    let url = "";
    if (!profile) {
        return <Preloader />;
    }
    if (profile.photos.large != null) {
        url = profile.photos.large;
    } else {
        url = NagievPhoto;
    }

    const onMainPhotoSelectod = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    };

    const onSubmit = (formData) => {
        saveProfile(formData).then(() => {
            setEditMode(false);
        })
    }

    return (
        <div>
            <div>
                <img
                    src="https://img1.goodfon.ru/original/2880x900/6/8a/more-pesok-tropiki-palmy.jpg"
                    alt=""
                />
            </div>
            <div className={classes.descriptionBlock}>
                <img src={url} alt="" />
            </div>
            {isOwner && <input type="file" onChange={onMainPhotoSelectod} />}

            { 
                editMode 
                ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile} /> 
                : <ProfileData goToEditMode={() => setEditMode(true)} profile={profile} isOwner={isOwner} /> 
            }

            <br />
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
    );
};

const Contact = ({ contactTitle, contackValue }) => {
    return (
        <div>
            <b className={classes.contact}>{contactTitle}</b>: {contackValue}
        </div>
    );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
    return (
        <div>
            {
                isOwner && <div><button onClick={goToEditMode}>edit</button></div>
            }

            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
            </div>

            {profile.lookingForAJob && (
                <div>
                    <b>My professional skills</b>: {profile.lookingForAJobDescription}
                </div>
            )}

            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>

            <div>
                <b>Contacts</b>:
                {Object.keys(profile.contacts).map((key) => {
                    return <Contact key={key} contactTitle={key} contackValue={profile.contacts[key]} />;
                })}
            </div>
        </div>
    );
};

export default ProfileInfo;
