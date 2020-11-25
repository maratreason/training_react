import React, { Component } from 'react'
import { connect } from 'react-redux';
import Header from './Header';
import {setAuthThunkCreator} from "../../redux-store/auth-reducer";

class HeaderContainer extends Component {
    componentDidMount() {
        const {id, email, login} = this.props;
        this.props.setAuth(id, email, login);
    }
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        id: state.auth.id,
        email: state.auth.email,
    }
}

export default connect(mapStateToProps, { setAuth: setAuthThunkCreator  })(HeaderContainer);