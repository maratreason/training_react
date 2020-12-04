import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormControls/FormControls";
import { login } from "../../redux-store/auth-reducer";
import classes from "./Login.module.css";

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
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

            { captchaUrl && <img className={classes.captcha} src={captchaUrl} alt="prop" /> }
            { captchaUrl && createField("Symbols from image", "captchaUrl", Input, [required]) }

            {
                error && <div className={classes.formSummaryError}>{error}</div>
            }
            <div><button>Login</button></div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: "login"
})(LoginForm);

const Login = ({ login, isAuth, captchaUrl }) => {
    const onSubmit = (formData) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captchaUrl);
    }

    if (isAuth) return <Redirect to={"/profile"} />

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
    }
    
};

export default connect(mapStateToProps, {login})(Login);