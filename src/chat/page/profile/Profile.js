import React, {useState} from "react";
import {useSelector} from "react-redux";
import "./Profile.scss"
import {uploadUserImg, USER_IMG_PATH} from "../../../util/userUtil";
import axios from "axios";
import {CHAT_SERVICE} from "../../../util/request";
import LogoutBtn from "./logoutBtn/LogoutBtn";


const Profile = (props) => {
    const currentUser = useSelector(state => state.currentUser);
    const [file, setFile] = useState();

    const fileChangedHandler = event => {
        setFile({ selectedFile: event.target.files[0] })
        uploadHandler(event.target.files[0])
    }

    const uploadHandler = (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': "Bearer " + localStorage.getItem("accessToken")
        }

        axios.post(CHAT_SERVICE + '/user/avatar', formData, {
            headers: headers
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <h2 className="page__title">Профиль</h2>
            <div className="user__info__card">
                <div className="user__info__card__content">
                    <span className="user__info__card__content__img">
                        <label htmlFor="file-input">
                            <img src={USER_IMG_PATH + currentUser.userImg}/>
                        </label>
                        <input id="file-input" type="file" accept="image/*" onChange={(e) => fileChangedHandler(e)}/>
                    </span>
                    <p className="user__info__card__content__username">{currentUser.nickname}</p>
                    <p className="user__info__card__content__about">React - JavaScript library for building user interfaces</p>
                </div>
            </div>

            <div className="user__info__btn_group">
                <LogoutBtn/>
            </div>


        </div>
    )
}

export default Profile;