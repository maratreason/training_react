import React, { useEffect, useState } from "react";

const ProfileStatusWithHooks = (props) =>  {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const activateStatus = () => {
        setEditMode(true);
    }

    const deactivateStatus = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {/* {
                !editMode && 
                <div><span onClick={activateStatus}>{props.status}</span></div>
            }
            {
                editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateStatus} value={status} />
                </div>
            } */}


            { 
                editMode 
                ? <div><input onChange={onStatusChange} autoFocus={true} onBlur={deactivateStatus} value={status} /></div>
                : <div><span onClick={activateStatus}>{props.status}</span></div>
            }
        </div>
    );
};

export default ProfileStatusWithHooks;
