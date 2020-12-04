import React, {Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Profile from './Profile';
import {setUserProfile, setUserProfileThunkCreator, getStatus, updateStatusUser, savePhoto, saveProfile} from "../../redux-store/profile-reducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.setUserProf(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatusUser}
                savePhoto={this.props.savePhoto}
            />
        )
    }
}

// компонент hoc 
// let AuthRedirectComponent = (props) => {
//     if (!this.props.isAuth) return <Redirect to={"/login"} />
//     return <ProfileContainer {...props} />
// }


// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
    }
}

// let withUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStateToProps, {
//     setUserProfile, setUserProf: setUserProfileThunkCreator
// })(withUrlDataContainerComponent);

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {setUserProfile, setUserProf: setUserProfileThunkCreator, getStatus, updateStatusUser, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer);