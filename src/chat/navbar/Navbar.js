import React from "react";
import "./Navbar.scss"
import Button from "./button/Button";
import {useSelector} from "react-redux";

const Navbar = (props) => {

    const tabs = useSelector(state => state.navbar);

    return (
        <section className="nav">
            <div className="nav__menu">
                <Button icon={"mdi-comment-plus-outline"} tab={tabs.users_add}/>
                <Button icon={"mdi-comment-outline"} tab={tabs.chats}/>
                <Button icon={"mdi-account-outline"} tab={tabs.users}/>
            </div>
        </section>
    );
}

export default Navbar;