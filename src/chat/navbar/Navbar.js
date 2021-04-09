import React from "react";
import "./Navbar.scss"
import {useRecoilState} from "recoil";
import {navBar} from "../../atom/globalState";

const Navbar = (props) => {

    const [currentActiveTab, setActiveTab] = useRecoilState(navBar);

    return (
        <section className="nav">
            <div className="nav__menu">
                <a className="tab-trigger" href="#page1"><i className="mdi nav__mdi mdi-account-outline"/></a>
                <a className="tab-trigger tab-trigger--active" href="#page2"><i className="mdi nav__mdi mdi-comment-outline"/></a>
                <a className="tab-trigger" href="#page3"><i className="mdi nav__mdi mdi-account-multiple-plus-outline"/></a>
            </div>
        </section>
    );
}

export default Navbar;