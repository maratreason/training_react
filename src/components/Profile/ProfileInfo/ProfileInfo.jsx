import React from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({ profile, status, updateStatus }) => {
    let url = '';
    if (!profile) {
        return <Preloader />
    }
    if (profile.photos.large != null) {
        url = profile.photos.large;
    } else {
        url = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Dmitry_Nagiev_2017_4.jpg/274px-Dmitry_Nagiev_2017_4.jpg";
    }
    return (
        <div>
            <div>
                <img src="https://img1.goodfon.ru/original/2880x900/6/8a/more-pesok-tropiki-palmy.jpg" alt="" />
            </div>
            <div className={classes.descriptionBlock}>
                <img src={url} alt=""/>
            </div>
            <h3>{profile.fullName}</h3>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />  
        </div>
    )
}

export default ProfileInfo;