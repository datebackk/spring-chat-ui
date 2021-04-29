import React from "react";
import {useSelector} from "react-redux";
import "./Profile.scss"


const Profile = (props) => {
    const currentUser = useSelector(state => state.currentUser);
    return (
        <div>
            <h2 className="page__title">Профиль</h2>
            <div className="user__info__card">
                <div className="user__info__card__content">
                    <img/>
                    <p className="user__info__card__content__username">{currentUser.nickname}</p>
                    <p className="user__info__card__content__about">about about</p>
                </div>
            </div>

        </div>
    )
}

export default Profile;