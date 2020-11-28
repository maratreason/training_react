import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormControls/FormControls";
import { login } from "../../redux-store/auth-reducer";
import classes from "./Login.module.css";

const LoginForm = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>{ createField("Email", "email", Input, [required]) }</div>
            <div>
                <Field placeholder={"password"} name={"password"} component={Input}
                    type={"password"}
                    validate={[required]}
                />
            </div>
            <div>
                <Field name={"rememberMe"} component={Input} type="checkbox" />Remember me
            </div>
            <div className={classes.formSummaryError}>{error}</div>
            <div><button>Login</button></div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: "login"
})(LoginForm);

const Login = ({ login, isAuth }) => {
    const onSubmit = (formData) => {
        login(formData.email, formData.password, formData.rememberMe);
    }

    if (isAuth) return <Redirect to={"/profile"} />

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);