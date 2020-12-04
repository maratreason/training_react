import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import UsersContainer from './components/Users/UsersContainer';

import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { initializeApp } from "./redux-store/app-reducer"
import Preloader from './components/common/Preloader/Preloader';
import withSuspense from './hoc/withSuspense';

// import DialogsContainer from './components/Dialogs/DialogsContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

class App extends Component {

    // catchAllUnhandleErrors = (reason, promise) => {
    //     alert("Some error occured");
    //     // console.error(promiseRejectionEvent);
    // }

    componentDidMount() {
        this.props.initializeApp();
        // window.addEventListener("unhandledrejection", this.catchAllUnhandleErrors);
    }

    // componentWillUnmount() {
    //     window.removeEventListener("unhandledrejection");
    // }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <BrowserRouter>
                <div className="app-wrapper">
                    <HeaderContainer />
                    <Navbar />
                    <div className="app-wrapper-content">
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
                            <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
                            <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
                            <Route path="/users" render={ () => <UsersContainer /> } />
                            <Route path="/login" render={ () => <Login /> } />
                            <Route path="*" render={ () => <div>404 Not Found</div> } />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);

export default AppContainer;
