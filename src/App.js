import React, {Component} from 'react';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { initializeApp } from "./redux-store/app-reducer"
import Preloader from './components/common/Preloader/Preloader';

class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }
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
                        <Route path="/dialogs" render={ () => <DialogsContainer /> } />
                        <Route path="/profile/:userId?" render={ () => <ProfileContainer /> } />
                        <Route path="/users" render={ () => <UsersContainer /> } />
                        <Route path="/login" render={ () => <Login /> } />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default compose(
    withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);
