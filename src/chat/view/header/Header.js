import React from "react";
import "./Header.scss"
import {useSelector} from "react-redux";
import {USER_IMG_PATH} from "../../../util/userUtil";


const Header = (props) => {

    const currentDialog = useSelector(state => state.view);
    const currentUser = useSelector(state => state.currentUser);

    let title;
    let userImg;
    if (currentDialog.details.sender.id === currentUser.id) {
        title = <h6>{currentDialog.details.recipient.nickname}</h6>
        userImg = USER_IMG_PATH + currentDialog.details.recipient.userImg
    } else {
        title = <h6>{currentDialog.details.sender.nickname}</h6>
        userImg = USER_IMG_PATH + currentDialog.details.sender.userImg
    }

    return (
        <div className="chat__header container">
            <div className="chat__header__avatar">
                <img className="chat__header__avatar-img" src={userImg} alt="avatar"/>
            </div>
            <div className="chat__header__info">
                {title}
                <p>online</p>
            </div>
        </div>
    )
}

export default Header;