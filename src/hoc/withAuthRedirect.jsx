import React, {Component} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const mapStateToPropsForRedirect = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect = (CustomComponent) => {
    class RedirectComponent extends Component {
        render() {
            if (!this.props.isAuth) return <Redirect to={"/login"} />
            return <CustomComponent {...this.props} />
        }
    }

    // дополнительная обертка коннектом, чтобы не пробрасывать в props каждый раз isAuth
    let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedRedirectComponent;
}
