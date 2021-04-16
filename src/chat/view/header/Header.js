import React from "react";
import "./Header.scss"
import {useSelector} from "react-redux";


const Header = (props) => {

    const currentDialog = useSelector(state => state.view);
    const currentUser = useSelector(state => state.currentUser);

    let title;
    console.log(currentDialog);
    if (currentDialog.details.sender.id === currentUser.id) {
        title = <h6>{currentDialog.details.recipient.nickname}</h6>
    } else {
        title = <h6>{currentDialog.details.sender.nickname}</h6>
    }

    return (
        <div className="chat__header container">
            <div className="chat__header__avatar">
                <img className="chat__header__avatar-img" src="./img/avatar.jpg" alt="avatar"/>
            </div>
            <div className="chat__header__info">
                {title}
                <p>online</p>
            </div>
        </div>
    )
}

export default Header;