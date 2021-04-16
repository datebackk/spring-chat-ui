import React, { useEffect } from "react";
import {getCurrentUser} from "../util/ApiUtil";
import "./Chat.scss"
import Navbar from "./navbar/Navbar";
import Page from "./page/Page";
import View from "./view/View";
import {useDispatch} from "react-redux";
import {setUser} from "../store/currentUser/actions";

const Chat = (props) => {

    const currentUserDispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("accessToken") === null) {
            props.history.push("/login");
        }
        loadCurrentUser();
    }, []);


    const loadCurrentUser = () => {
        getCurrentUser()
            .then((response) => {
                currentUserDispatch(setUser(response));
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
            <Navbar />
            <Page />
            <View />
        </section>
    );
};

export default Chat;