import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {openDialog} from "../../../../store/view/actions";
import {USER_IMG_PATH} from "../../../../util/userUtil";
import moment from "moment";


const Test = (props) => {



    return (
        <div className="chat-card" >
            {/*<div className={badgeClass.join(' ')}>*/}
            {/*    <span></span>*/}
            {/*</div>*/}
            <div className="chat-card__body">
                <div className="chat-card__content">
                    <div className="chat-card__avatar">
                        <img className="chat-card__avatar-img" src={USER_IMG_PATH + 'default.png'} alt="avatar"/>
                    </div>
                    <div className="chat-card__media">
                        <div className="chat-card__title">
                            <h6>Общий канал</h6>
                            <p>{moment.utc("02.05.2021 00:43:57", 'DD.MM.YYYY hh:mm:ss').local().startOf('minutes').fromNow()}</p>

                        </div>
                        <div className="chat-card__text">
                            hi
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Test;