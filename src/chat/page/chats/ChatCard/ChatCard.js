import React, {useEffect, useState} from "react";
import "./ChatCard.scss"
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {openDialog} from "../../../../store/view/actions";
import {countNewMessages} from "../../../../util/messageUtil";


const ChatCard = ({cardDetails}) => {

    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();

    const [currentCardDetails, setCardDetails] = useState(cardDetails);

    useEffect(() => {
        getNewMessages()
    }, [cardDetails])

    const getNewMessages = () => {
        countNewMessages(currentCardDetails.chatId)
            .then((response) => {
                setCardDetails({...currentCardDetails, newMessages: response.countedMessages !== 0 ? response.countedMessages : null})
             })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleClick = () => {
        dispatch(openDialog(currentCardDetails))
        setCardDetails({...cardDetails, newMessages: null})
    }

    let title;
    if (currentCardDetails.sender.id === currentUser.id) {
        title = <h6>{currentCardDetails.recipient.nickname}</h6>
    } else {
        title = <h6>{currentCardDetails.sender.nickname}</h6>
    }


    return (
        <div className="chat-card" onClick={handleClick}>
            <div className="chat-card__body">
                <div className="chat-card__content">
                    <div className="chat-card__avatar">
                        <img className="chat-card__avatar-img" src={require('../../../../assets/img/avatar.jpg')} alt="avatar"/>
                    </div>
                    <div className="chat-card__media">
                        <div className="chat-card__title">
                            {title}
                            {currentCardDetails.newMessages}
                            <p>10:20 am {currentCardDetails.newMessages}</p>
                        </div>
                        <div className="chat-card__text">
                            Hello! Let me transfer you to the marketing department.
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