import React, { useEffect } from "react";
import {loggedInUser, navBar} from "../atom/globalState";
import {opendDialog} from "../atom/globalState";
import {useRecoilState} from "recoil";
import {getCurrentUser} from "../util/ApiUtil";
import "./Chat.scss"
import Navbar from "./navbar/Navbar";
import Page from "./page/Page";
import View from "./view/View";

const Chat = (props) => {

    const [currentUser, setLoggedInUser] = useRecoilState(loggedInUser);
    const [currentDialog, setCurrentDialog] = useRecoilState(opendDialog);
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

    const switchTab = (tabName) => {
        let newTabs = JSON.parse(JSON.stringify(tabs));
        for (const key in newTabs) {
            console.log(newTabs[key]);
            if (newTabs[key].isActive || tabName === key) {
                newTabs[key].isActive = !newTabs[key].isActive;
            }

        }
        return  setActiveTab(newTabs);
    }

    const openDialog = (name) => {
        setCurrentDialog({name: name});
    }

    return (
        <section className="wrapper">
            <Navbar tabs={tabs} switchTab={switchTab}/>
            <Page activeTab={tabs} currentUser={currentUser} openDialog={openDialog}/>
            <View currentUser={currentUser} currentDialog={currentDialog}/>
        </section>
    );
};

export default Chat;