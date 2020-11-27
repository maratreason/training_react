import React from "react";
import { Redirect } from "react-router-dom";
import classes from "./Dialogs.module.css";
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Dialogs';
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../common/FormControls/FormControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";

const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(el => <DialogItem id={el.id} name={el.name} key={el.id} />);
    let messagesElements = state.messages.map(el => <Message message={el.message} key={el.id} />);

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }

    if (!props.isAuth) {
        return <Redirect to={"/login"} />
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={classes.messages}>
                <div>{ messagesElements }</div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>
    );
}

const maxLength50 = maxLengthCreator(50);

// Вынести это в отдельный файл
const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                    name="newMessageBody"
                    placeholder="Enter your message"
                    validate={[required, maxLength50]} />
            </div>
            <div><button>Send</button></div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs;
