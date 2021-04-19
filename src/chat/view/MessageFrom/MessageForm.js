import React from "react";
import "./MessageFrom.scss"
import {sendNewMessage} from "../../../util/ApiUtil";
import {useDispatch, useSelector} from "react-redux";
import {Formik} from "formik";
import * as yup from "yup";
import {addMessage} from "../../../store/page/chats/messages/actions";

const MessageForm = (props) => {

    const currentDialog = useSelector(state => state.view);
    const currentUser = useSelector(state => state.currentUser);
    const stompClient = useSelector(state => state.stompClient);

    const dispatch = useDispatch();

    const sendMessage = message => {
        const newMessage = {
            chatId: currentDialog.details.chatId,
            senderId: currentUser.id,
            recipientId: currentDialog.details.sender.id === currentUser.id ? currentDialog.details.recipient.id : currentDialog.details.sender.id,
            message: message.message
        }

        console.log(newMessage);

        sendNewMessage(newMessage);
        stompClient.send("/app/chat/" + newMessage.recipientId, {}, JSON.stringify(newMessage))
        dispatch(addMessage(newMessage));
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
                    <textarea placeholder="Наберите свое сообщение..."
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