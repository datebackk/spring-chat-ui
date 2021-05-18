import React from "react";
import "./MessageFrom.scss"
import {useDispatch, useSelector} from "react-redux";
import {Form, Formik} from "formik";
import * as yup from "yup";
import {addMessage} from "../../../store/page/chats/messages/actions";
import {sendNewMessage} from "../../../util/messageUtil";
import moment from "moment";
import {softUpdate} from "../../../store/page/chats/actions";
import {createNewChat} from "../../../util/chatsUttil";
import {openDialog} from "../../../store/view/actions";
import {message} from "antd";

const MessageForm = (props) => {

    const currentDialog = useSelector(state => state.view);
    const currentUser = useSelector(state => state.currentUser);
    const stompClient = useSelector(state => state.stompClient);

    const dispatch = useDispatch();
    const sendMessage = message => {
        if (currentDialog.action === "CREATE") {
            const newDialog = {
                chatId: currentDialog.details.chatId,
                sender: currentDialog.details.sender,
                recipient: currentDialog.details.recipient,
                newMessages: 0,
                lastMessage: {
                    chatId: currentDialog.details.chatId,
                    senderId: currentUser.id,
                    recipientId: currentDialog.details.sender.id === currentUser.id ? currentDialog.details.recipient.id : currentDialog.details.sender.id,
                    message: message.message,
                    date: moment.utc().format('DD.MM.YYYY HH:mm:ss'),
                    status: "SENT"
                }
            }
            console.log(newDialog);

            createNewChat(newDialog)
                .then((response) => {
                    stompClient.send("/app/chat/" + response.lastMessage.recipientId, {}, JSON.stringify(response.lastMessage))
                    dispatch(addMessage(response.lastMessage));
                    console.log(response)
                    dispatch(softUpdate(currentDialog.details, response.lastMessage));
                })
                .catch((error) => {
                    console.log(error);
                    message.error(error.message);
                })
        } else {
            const newMessage = {
                chatId: currentDialog.details.chatId,
                senderId: currentUser.id,
                recipientId: currentDialog.details.sender.id === currentUser.id ? currentDialog.details.recipient.id : currentDialog.details.sender.id,
                message: message.message,
                date: moment.utc().format('DD.MM.YYYY HH:mm:ss'),
                status: "SENT"
            }
            sendNewMessage(newMessage)
                .then((response) => {
                    stompClient.send("/app/chat/" + newMessage.recipientId, {}, JSON.stringify(response))
                    dispatch(addMessage(response));
                    console.log(response)
                    dispatch(softUpdate(currentDialog.details, response));
                })
                .catch((error) => {
                    console.log(error);
                    message.error(error.message);
                });
        }

        if (currentDialog.action === "CREATE") {
            dispatch(openDialog(currentDialog.details));
        }
    }

    const validationSchema = yup.object().shape({
        message: yup.string().required('пустое сообщение')
    })

    return (
        <Formik initialValues={{message: ''}}
                validateOnBlur
                validationSchema={validationSchema}
                onSubmit={(values, {resetForm}) => {
                    sendMessage(values)
                    resetForm()
                }}
        >
            {({values, errors, touched, handleChange, isValid, handleSubmit, isSubmitting, dirty}) => (
                <form onSubmit={handleSubmit} className="chat__footer__form-group">
                    <textarea placeholder="Напишите сообщение..."
                              name={"message"}
                              onChange={handleChange}
                              value={values.message}
                              autoFocus
                    />
                    <button type="submit" disabled={!isValid && !dirty}><i className="mdi mdi-send"/></button>
                </form>
            )}
        </Formik>
    )
};

export default MessageForm;