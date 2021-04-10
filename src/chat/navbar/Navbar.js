import React from "react";
import "./Navbar.scss"
import {useRecoilState} from "recoil";
import {navBar} from "../../atom/globalState";
import Button from "./Button/Button";

const Navbar = (props) => {

    const [currentActiveTab, setActiveTab] = useRecoilState(navBar);

    return (
        <section className="nav">
            <div className="nav__menu">
                <Button icon={"mdi-account-outline"} isActive={false}/>
                <Button icon={"mdi-comment-outline"} isActive={true}/>
                <Button icon={"mdi-account-multiple-plus-outline"} isActive={false}/>
            </div>
        </section>
    );
}

export default Navbar;