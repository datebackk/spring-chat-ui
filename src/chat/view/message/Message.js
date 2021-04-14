import React from "react";
import "./Message.scss"


const Message = (pops) => {
    return (
        <div className="message">
            <a className="message__avatar" href="#">
                <img className="message__avatar-img" src="./img/avatar.jpg" alt="avatar"/>
            </a>

            <div className="message__body">
                <div className="message__row">
                    <div className="message__card">
                        <div className="message__content">
                            Hey! Hey! Hey! Hey! Hey! Hey! Hey! Hey! Hey! Hey! Hey! Hey! Hey! Hey! Hey! Hey! Hey! Hey!
                            Hey! Hey! Hey! Hey! Hey! Hey! Hey! Hey! Hey! Hey!
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

export default Message;