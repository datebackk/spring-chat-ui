import React from "react";
import PropTypes from "prop-types";
import "./Button.scss"
import {useDispatch} from "react-redux";
import {changeActiveTab} from "../../../store/navbar/actions";

const Button = ({icon, tab}) => {

    const dispatch = useDispatch();

    let mdiClass = ['mdi', 'nav__mdi'];
    mdiClass.push(icon);

    if (tab.isActive) {
        mdiClass.push('mdi--active');
    }

    return (
        <button className="tab-trigger" onClick={() => dispatch(changeActiveTab(tab.name))}><i className={mdiClass.join(' ')}/></button>
    );
};

Button.prototype = {
    icon: PropTypes.string.isRequired,
    tab: PropTypes.object.isRequired
}

export default Button;