import React from "react";
import "./Navbar.scss"
import Button from "./button/Button";
import PropTypes, {object} from "prop-types";

const Navbar = ({tabs, switchTab}) => {
    return (
        <section className="nav">
            <div className="nav__menu">
                <Button icon={"mdi-account-outline"} tab={tabs.users} switchTab={switchTab}/>
                <Button icon={"mdi-comment-outline"} tab={tabs.chats} switchTab={switchTab}/>
                <Button icon={"mdi-account-multiple-plus-outline"} tab={tabs.users_add} switchTab={switchTab}/>
            </div>
        </section>
    );
}

Navbar.prototype = {
    tabs: PropTypes.object.isRequired,
    switchTab: PropTypes.func.isRequired
}

export default Navbar;