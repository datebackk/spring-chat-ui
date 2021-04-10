import React from "react";
import PropTypes from "prop-types";
import "./Button.scss"

const Button = ({icon, isActive}) => {
    let mdiClass = ['mdi', 'nav__mdi'];
    mdiClass.push(icon);

    if (isActive) {
        mdiClass.push('mdi--active');
    }

    return (
        <button className="tab-trigger"><i className={mdiClass.join(' ')}/></button>
    );
};

Button.prototype = {
    icon: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired
}

export default Button;