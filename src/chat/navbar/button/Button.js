import React from "react";
import PropTypes from "prop-types";
import "./Button.scss"

const Button = ({icon, tab, switchTab}) => {
    let mdiClass = ['mdi', 'nav__mdi'];
    mdiClass.push(icon);

    if (tab.isActive) {
        mdiClass.push('mdi--active');
    }

    return (
        <button className="tab-trigger" onClick={() => switchTab(tab.name)}><i className={mdiClass.join(' ')}/></button>
    );
};

Button.prototype = {
    icon: PropTypes.string.isRequired,
    tab: PropTypes.object.isRequired,
    switchTab: PropTypes.func.isRequired
}

export default Button;