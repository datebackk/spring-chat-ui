import React from "react";
import "./MessageFrom.scss"
import PropTypes from "prop-types";
import {useForm} from "react-hook-form";
import {sendNewMessage} from "../../../util/ApiUtil";

const MessageForm = ({currentUser, currentDialog}) => {

    const { register, handleSubmit, errors } = useForm();

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

MessageForm.prototype = {
    currentUser: PropTypes.object.isRequired,
    currentDialog: PropTypes.object.isRequired
}

export default MessageForm;