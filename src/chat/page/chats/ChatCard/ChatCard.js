import React, {useEffect, useState} from "react";
import "./ChatCard.scss"
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {openDialog} from "../../../../store/view/actions";
import {USER_IMG_PATH} from "../../../../util/userUtil";
import moment from "moment";


const ChatCard = ({cardDetails}) => {

    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();
    const [newMessages, setNewMessages] = useState(cardDetails.newMessages);

    useEffect(() => {
        setNewMessages(cardDetails.newMessages);
    }, [cardDetails])


    const handleClick = () => {
        setNewMessages(0);
        dispatch(openDialog(cardDetails))
    }

    let title;
    let userImg;
    if (cardDetails.chatId === 'public') {
        title = <h6>Общий чат</h6>
    } else if (cardDetails.sender.id === currentUser.id) {
        title = <h6>{cardDetails.recipient.nickname}</h6>
        userImg = USER_IMG_PATH + cardDetails.recipient.userImg
    } else if (cardDetails.recipient.id === currentUser.id) {
        title = <h6>{cardDetails.sender.nickname}</h6>
        userImg = USER_IMG_PATH + cardDetails.sender.userImg
    } else {
        title = <h6>Общий чат</h6>
    }

    let badgeClass = ['card-badge']
    if (newMessages >= 1) {
        badgeClass.push('card-badge-show')
    }


    return (
        <div className="chat-card" onClick={handleClick}>
            <div className={badgeClass.join(' ')}>
                <span>{newMessages}</span>
            </div>
            <div className="chat-card__body">
                <div className="chat-card__content">
                    <div className="chat-card__avatar">
                        {cardDetails.chatId === 'public' ? null : <img className="chat-card__avatar-img" src={userImg} alt="avatar"/>}
                    </div>
                    <div className="chat-card__media">
                        <div className="chat-card__title">
                            {title}
                            {/*<p>{cardDetails.lastMessage?.date}</p>*/}
                            <p>{cardDetails.chatId === 'public' ? null : moment.utc(cardDetails.lastMessage?.date, 'DD.MM.YYYY hh:mm:ss').local().startOf('minutes').fromNow()}</p>

                        </div>
                        <div className="chat-card__text">
                            {cardDetails.lastMessage?.message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ChatCard.propTypes = {
    cardDetails: PropTypes.object.isRequired
}

export default ChatCard;