import React, {useEffect, useState} from "react";
import "./Message.scss"
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {updateMessageStatus} from "../../../util/messageUtil";
import moment from "moment";


const Message = ({messageDetails}) => {

    const currentUser = useSelector(state => state.currentUser);
    const stompClient = useSelector(state => state.stompClient);
    const [message, setMessage] = useState(messageDetails);

    useEffect(() => {
        if (message.senderId !== currentUser.id && message.status === "SENT") {
            updateMessageStatus({...message, status: "READ"})
                .then((response) => {
                    setMessage(response);
                    stompClient.send("/app/message-status/" + response.senderId, {}, JSON.stringify(response))
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [messageDetails])

    let messageClass = ['message'];
    if (message.senderId === currentUser.id) {
        messageClass.push('message--right');
    }

    return (
        <div className={messageClass.join(' ')}>
            <a className="message__avatar" href="#">
                <img className="message__avatar-img" src={require('../../../assets/img/avatar.jpg')} alt="avatar"/>
            </a>

            <div className="message__body">
                <div className="message__row">
                    <div className="message__card">
                        <div className="message__content">
                            {message.message}
                        </div>
                        <div className="message__time">
                            {moment.utc(message.date, 'DD.MM.YYYY hh:mm:ss').local().startOf('minutes').fromNow()} {message.status}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Message.propTypes = {
    currentDialog: PropTypes.object.isRequired
}

export default Message;