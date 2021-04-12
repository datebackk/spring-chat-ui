import React, { useEffect } from "react";
import {loggedInUser, navBar} from "../atom/globalState";
import {useRecoilState} from "recoil";
import {getCurrentUser} from "../util/ApiUtil";
import "./Chat.scss"
import Navbar from "./navbar/Navbar";
import Page from "./page/Page";
import View from "./view/View";

const Chat = (props) => {

    const [currentUser, setLoggedInUser] = useRecoilState(loggedInUser);
    const [tabs, setActiveTab] = useRecoilState(navBar);

    useEffect(() => {
        if (localStorage.getItem("accessToken") === null) {
            props.history.push("/login");
        }
        loadCurrentUser();
    }, []);


    const loadCurrentUser = () => {
        getCurrentUser()
            .then((response) => {
                setLoggedInUser(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        props.history.push("/login");
    };

    function switchTab(tabName) {
        // setActiveTab(
        //     Object.values(tabs).map(tab => {
        //     if (tab.isActive || tab.name === key) {
        //         tab.isActive = !tab.isActive;
        //     }
        //     return tab;
        //     })
        // );
        let b = Object.keys(tabs).map(key => {
            if (tabs[key].isActive || tabName === key) {
                tabs[key].isActive = !tabs[key].isActive;
            }
            return tabs[key];
        })
        console.log(Object.keys(b));
    }

    return (
        <section className="wrapper">
            <Navbar tabs={tabs} switchTab={switchTab}/>
            <Page activeTab={tabs}/>
            <View/>
        </section>
    );
};

export default Chat;