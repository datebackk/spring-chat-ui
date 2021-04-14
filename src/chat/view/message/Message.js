import React from "react";
import "./Message.scss"
import PropTypes from "prop-types";


const Message = ({currentUser, messageDetails}) => {

    let messageClass = ['message'];
    console.log(messageDetails.senderId, currentUser.id);
    if (messageDetails.senderId === currentUser.id) {
        messageClass.push('message--right');
    }

    return (
        <div className={messageClass.join(' ')}>
            <a className="message__avatar" href="#">
                <img className="message__avatar-img" src="./img/avatar.jpg" alt="avatar"/>
            </a>

            <div className="message__body">
                <div className="message__row">
                    <div className="message__card">
                        <div className="message__content">
                            {messageDetails.message}
                        </div>
                        <div className="message__time">
                            8 min ago
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Message.prototype = {
    currentUser: PropTypes.object.isRequired,
    currentDialog: PropTypes.object.isRequired
}

export default Message;