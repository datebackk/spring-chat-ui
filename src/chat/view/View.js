import React from "react";
import "./View.scss"
import Message from "./message/Message";

const View = ({currentDialog}) => {
    return (
        <section className="view">
            <div className="chat">
                <div className="chat__content">

                    <div className="chat__header container">
                        <div className="chat__header__avatar">
                            <img className="chat__header__avatar-img" src="./img/avatar.jpg" alt="avatar"/>
                        </div>
                        <div className="chat__header__info">
                            <h6>{currentDialog.name}</h6>
                            <p>online</p>
                        </div>
                    </div>

                    <div className="chat__messages container">
                        <Message/>
                    </div>
                    <div className="chat__footer container">
                        <form className="chat__footer__form-group">
                            <textarea placeholder="Наберите свое сообщение..."></textarea>

                            <button type="submit"><i className="mdi mdi-send"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default View;