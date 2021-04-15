import React, {useEffect} from "react";
import "./View.scss"
import Message from "./message/Message";
import PropTypes from "prop-types";
import MessageForm from "./MessageFrom/MessageForm";
import {useRecoilState} from "recoil";
import {chatMessages} from "../../atom/globalState";
import {getChatMessages} from "../../util/ApiUtil";

const View = ({currentUser, currentDialog}) => {

    const [currentChatMessages, setMessages] = useRecoilState(chatMessages);

    useEffect(() => {
        loadChatMessages();
    }, [currentDialog]);

    const loadChatMessages = () => {
        getChatMessages(currentDialog.details.chatId)
            .then((response) => {
                setMessages(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    let title;
    console.log(currentDialog);
    if (currentDialog.details.sender.id === currentUser.id) {
        title = <h6>{currentDialog.details.recipient.nickname}</h6>
    } else {
        title = <h6>{currentDialog.details.sender.nickname}</h6>
    }

    return (
        <section className="view">
            <div className="chat">
                <div className="chat__content">

                    <div className="chat__header container">
                        <div className="chat__header__avatar">
                            <img className="chat__header__avatar-img" src="./img/avatar.jpg" alt="avatar"/>
                        </div>
                        <div className="chat__header__info">
                            {title}
                            <p>online</p>
                        </div>
                    </div>

                    <div className="chat__messages container">
                        {currentChatMessages.map((item, key) => <Message key={key} currentUser={currentUser} messageDetails={item}/>)}
                    </div>

                    <div className="chat__footer container">
                        <MessageForm currentDialog={currentDialog}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

View.prototype = {
    currentUser: PropTypes.object.isRequired,
    currentDialog: PropTypes.object.isRequired
}

export default View;