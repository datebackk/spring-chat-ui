import React, {useEffect, useState} from "react";
import "./ChatCard.scss"
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {openDialog} from "../../../../store/view/actions";


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
    if (cardDetails.sender.id === currentUser.id) {
        title = <h6>{cardDetails.recipient.nickname}</h6>
    } else {
        title = <h6>{cardDetails.sender.nickname}</h6>
    }


    return (
        <div className="chat-card" onClick={handleClick}>
            <div className="card-badge">
                <span>{newMessages}</span>
            </div>
            <div className="chat-card__body">
                <div className="chat-card__content">
                    <div className="chat-card__avatar">
                        <img className="chat-card__avatar-img" src={require('../../../../assets/img/avatar.jpg')} alt="avatar"/>
                    </div>
                    <div className="chat-card__media">
                        <div className="chat-card__title">
                            {title}
                            <p>{cardDetails.lastMessage?.date}</p>

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