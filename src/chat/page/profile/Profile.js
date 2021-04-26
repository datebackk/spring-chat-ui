import React from "react";
import {useSelector} from "react-redux";


const Profile = (props) => {
    const currentUser = useSelector(state => state.currentUser);
    return (
        <div>
            <h2 className="page__title">Профиль</h2>
            <p className="page__title">{currentUser.nickname}</p>
        </div>
    )
}

export default Profile;