import React, {useEffect} from "react";
import "./Message.scss"
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {updateMessage} from "../../../util/messageUtil";
import moment from "moment";


const Message = ({messageDetails}) => {

    const currentUser = useSelector(state => state.currentUser);
    const stompClient = useSelector(state => state.stompClient);

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
    let badgeClass = ['message-badge']
    if (messageDetails.senderId === currentUser.id) {
        messageClass.push('message--right');
    }

    if (messageDetails.status === "SENT" && messageDetails.senderId === currentUser.id) {
        badgeClass.push('message-badge-right');
    }

    return (
        <div className={messageClass.join(' ')}>
            <a className="message__avatar" href="#">
                <img className="message__avatar-img" src={require('../../../assets/img/avatar.jpg')} alt="avatar"/>
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