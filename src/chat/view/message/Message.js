import React, {useEffect} from "react";
import "./Message.scss"
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {updateMessage} from "../../../util/messageUtil";
import moment from "moment";
import {USER_IMG_PATH} from "../../../util/userUtil";


const Message = ({messageDetails}) => {

    const currentUser = useSelector(state => state.currentUser);
    const stompClient = useSelector(state => state.stompClient);
    const currentDialog = useSelector(state => state.view);

    useEffect(() => {
        if (messageDetails.senderId !== currentUser.id && messageDetails.status === "SENT") {
            updateMessage({...messageDetails, status: "READ"})
                .then((response) => {
                    stompClient.send("/app/message-status/" + response.senderId, {}, JSON.stringify(response))
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [])

    let messageClass = ['message'];
    let badgeClass = ['message-badge'];
    let userImg = currentDialog.details.chatId === "public" ? USER_IMG_PATH + 'default.png' : null;
    if (messageDetails.senderId === currentUser.id) {
        messageClass.push('message--right');
        userImg = USER_IMG_PATH + currentUser.userImg;
    } else if (!userImg) {
        userImg = currentDialog.details.sender.id === currentUser.id ? USER_IMG_PATH + currentDialog.details.recipient.userImg : USER_IMG_PATH + currentDialog.details.sender.userImg
    }

    if (messageDetails.status === "SENT" && messageDetails.senderId === currentUser.id) {
        badgeClass.push('message-badge-right');
    }

    return (
        <div className={messageClass.join(' ')}>
            <a className="message__avatar" href="#">
                <img className="message__avatar-img" src={userImg} alt="avatar"/>
            </a>

            <div className="message__body">
                <div className="message__row">
                    <div className="message__card">
                        <div className={badgeClass.join(' ')}>
                        </div>
                        <div className="message__content">
                            {messageDetails.message}
                        </div>
                        <div className="message__time">
                            {moment.utc(messageDetails.date, 'DD.MM.YYYY hh:mm:ss').local().startOf('minutes').fromNow()}
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