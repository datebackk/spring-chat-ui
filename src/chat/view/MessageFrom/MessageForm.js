import React from "react";
import "./MessageFrom.scss"
import {useDispatch, useSelector} from "react-redux";
import {Formik} from "formik";
import * as yup from "yup";
import {addMessage} from "../../../store/page/chats/messages/actions";
import {sendNewMessage} from "../../../util/messageUtil";
import moment from "moment";
import {softUpdate} from "../../../store/page/chats/actions";
import {createNewChat} from "../../../util/chatsUttil";
import {openDialog} from "../../../store/view/actions";

const MessageForm = (props) => {

    const currentDialog = useSelector(state => state.view);
    const currentUser = useSelector(state => state.currentUser);
    const stompClient = useSelector(state => state.stompClient);

    const dispatch = useDispatch();
    console.log(currentDialog.details);
    const sendMessage = message => {
        if (currentDialog.action === "CREATE") {

            createNewChat(currentDialog.details);

        }
        const newMessage = {
            chatId: currentDialog.details.chatId,
            senderId: currentUser.id,
            recipientId: currentDialog.details.sender.id === currentUser.id ? currentDialog.details.recipient.id : currentDialog.details.sender.id,
            message: message.message,
            date: moment.utc().format('DD.MM.YYYY HH:mm:ss'),
            status: "SENT",
        }
        sendNewMessage(newMessage)
            .then((response) => {
                stompClient.send("/app/chat/" + newMessage.recipientId, {}, JSON.stringify(response))
                dispatch(addMessage(response));
                dispatch(softUpdate(currentDialog.details, response));
            })
            .catch((error) => {
                console.log(error);
            });

        if (currentDialog.action === "CREATE") {
            dispatch(openDialog(currentDialog));
        }
    }

    const validationSchema = yup.object().shape({
        message: yup.string().required('пустое сообщение')
    })

    return (
        <Formik initialValues={{message: ''}}
                validateOnBlur
                onSubmit={(values) => sendMessage(values)}
                validationSchema={validationSchema}
        >
            {({values, errors, touched, handleChange, isValid, handleSubmit, dirty}) => (
                <form onSubmit={handleSubmit} className="chat__footer__form-group">
                    <textarea placeholder="Напишите сообщение..."
                              name={"message"}
                              onChange={handleChange}
                              defaultValue={values.message}
                    />
                    <button type={"submit"}
                            disabled={!isValid && !dirty}
                    ><i className="mdi mdi-send"/></button>
                </form>
            )}
        </Formik>
    )
};

export default MessageForm;