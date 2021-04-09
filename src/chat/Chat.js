import React, { useEffect } from "react";
import {loggedInUser} from "../atom/globalState";
import {useRecoilState} from "recoil";
import {getCurrentUser} from "../util/ApiUtil";
import "./Chat.scss"
import Navbar from "./navbar/Navbar";
import Page from "./page/Page";
import View from "./view/View";

const Chat = (props) => {

    const [currentUser, setLoggedInUser] = useRecoilState(loggedInUser);

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

    return (
        <section className="wrapper">
            <Navbar></Navbar>
            <Page></Page>
            <View></View>
        </section>
    );
};

export default Chat;