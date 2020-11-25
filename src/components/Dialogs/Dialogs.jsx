import React from "react";
import { Redirect } from "react-router-dom";
import classes from "./Dialogs.module.css";
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Dialogs';

const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(el => <DialogItem id={el.id} name={el.name} key={el.id} />);
    let messagesElements = state.messages.map(el => <Message message={el.message} key={el.id} />);
    let newMessageBody = state.newMessageBody;

    let onSendMessageClick = () => {
        props.sendMessage();
    }

    let onNewMessageChange = (event) => {
        let body = event.target.value;
        props.updateNewMessageBody(body);
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
                <div>
                    <div>
                        <textarea placeholder="Enter your message"
                            onChange={onNewMessageChange}
                            value={newMessageBody}
                        ></textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Add Message</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;
