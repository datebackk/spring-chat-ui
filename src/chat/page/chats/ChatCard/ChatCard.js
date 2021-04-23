import React from "react";
import "./ChatCard.scss"
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {openDialog} from "../../../../store/view/actions";


const ChatCard = ({cardDetails}) => {

    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();

    let title;
    if (cardDetails.sender.id === currentUser.id) {
        title = <h6>{cardDetails.recipient.nickname}</h6>
    } else {
        title = <h6>{cardDetails.sender.nickname}</h6>
    }


    return (
        <div className="chat-card" onClick={() => dispatch(openDialog(cardDetails))}>
            <div className="chat-card__body">
                <div className="chat-card__content">
                    <div className="chat-card__avatar">
                        <img className="chat-card__avatar-img" src={require('../../../../assets/img/avatar.jpg')} alt="avatar"/>
                    </div>
                    <div className="chat-card__media">
                        <div className="chat-card__title">
                            {title}
                            <p>10:20 am</p>
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

ChatCard.prototype = {
    cardDetails: PropTypes.object.isRequired
}

export default ChatCard;