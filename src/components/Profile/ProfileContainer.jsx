import React, {Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Profile from './Profile';
import {setUserProfile, setUserProfileThunkCreator, getStatus, updateStatusUser} from "../../redux-store/profile-reducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends Component {
    componentDidMount() {
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

    render() {
        return (
            <Profile {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatusUser}
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
    console.log("mapStateToProps PROFILE");
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
    connect(mapStateToProps, {setUserProfile, setUserProf: setUserProfileThunkCreator, getStatus, updateStatusUser}),
    withRouter
)(ProfileContainer);