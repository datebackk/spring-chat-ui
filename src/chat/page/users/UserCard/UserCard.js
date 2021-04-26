import React from "react";
import "./UsersCard.scss";
import {useDispatch, useSelector} from "react-redux";
import {createDialog, openDialog} from "../../../../store/view/actions";
import {getUserChat} from "../../../../util/chatsUttil";
import {changeActiveTab} from "../../../../store/navbar/actions";

const UserCard = ({user}) => {
    console.log(user);

    const currentUser = useSelector(state => state.currentUser)
    const currentDialog = useSelector(state => state.view);
    const chats = useSelector(state => state.chats);
    const navbar = useSelector(state => state.navbar);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (currentDialog.details.sender?.id === currentUser.id && currentDialog.details.recipient?.id === user.id || currentDialog.details.sender?.id === user.id && currentDialog.details.recipient?.id === currentUser.id) {

        } else {
            getUserChat(user.email)
                .then((response) => {
                    dispatch(openDialog(response));
                    dispatch(changeActiveTab("chats"));
                }).catch((error) => {
                    if (error.status === 400) {
                        const newDialog = {
                            chatId: currentUser.id + user.id,
                            sender: currentUser,
                            recipient: user,
                            newMessages: 0,
                            lastMessage: null
                        }
                        dispatch(createDialog(newDialog));
                    } else {
                        console.log(error)
                    }
            })
        }
    }

    return (
        <div className="chat-card" onClick={() => handleClick()}>
            <div className="chat-card__body">
                <div className="chat-card__content">
                    <div className="chat-card__avatar">
                        <img className="chat-card__avatar-img" src="./img/avatar.jpg" alt="avatar"/>
                    </div>
                    <div className="chat-card__media">
                        <div className="chat-card__title">
                            <h6>{user.nickname}</h6>
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

export default UserCard;