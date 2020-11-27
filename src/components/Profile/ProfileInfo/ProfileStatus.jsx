import React from "react";
import classes from "./ProfileInfo.module.css";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateStatus = () => {
        this.setState({editMode: true});
    }

    deactivateStatus = () => {
        this.setState({editMode: false});
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (event) => {
        this.setState({status: event.currentTarget.value});
    }

    render() {
        return (
            <div>
                { 
                    this.state.editMode 
                    ? <div><input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateStatus} value={this.state.status} /></div>
                    : <div><span onClick={this.activateStatus}>{this.props.status}</span></div>
                }
            </div>
        );
    }
};

export default ProfileStatus;
