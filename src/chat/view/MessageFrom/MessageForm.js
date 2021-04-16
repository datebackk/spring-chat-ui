import React from "react";
import "./MessageFrom.scss"
import {useForm} from "react-hook-form";
import {sendNewMessage} from "../../../util/ApiUtil";
import {useSelector} from "react-redux";

const MessageForm = (props) => {

    const { register, handleSubmit, errors } = useForm();
    const currentDialog = useSelector(state => state.view);
    const currentUser = useSelector(state => state.currentUser);

    const sendMessage = message => {
        const newMessage = {
            chatId: currentDialog.chatId,
            senderId: currentUser.id,
            recipientId: currentDialog.sender.id === currentUser.id ? currentDialog.sender.id : currentDialog.recipient.id,
            message: message.message
        }

        sendNewMessage(newMessage);
    }

    return (
        <form onSubmit={sendMessage} className="chat__footer__form-group">
            <textarea placeholder="Наберите свое сообщение..." name="message" ref={register}/>
            <button type="submit"><i className="mdi mdi-send"/></button>
        </form>
    )
}

export default MessageForm;