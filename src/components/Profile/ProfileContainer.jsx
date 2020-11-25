import React, {Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Profile from './Profile';
import {setUserProfile, setUserProfileThunkCreator} from "../../redux-store/profile-reducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) userId = 2;
        this.props.setUserProf(userId);
    }

    render() {
        
        return (
            <Profile {...this.props} profile={this.props.profile} />
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
    }
}

// let withUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStateToProps, {
//     setUserProfile, setUserProf: setUserProfileThunkCreator
// })(withUrlDataContainerComponent);

export default compose(
    connect(mapStateToProps, {setUserProfile, setUserProf: setUserProfileThunkCreator}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);