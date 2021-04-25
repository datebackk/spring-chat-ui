import React from "react";
import "./UsersCard.scss";

const UserCard = ({user}) => {



    return (
        <div className="chat-card">
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