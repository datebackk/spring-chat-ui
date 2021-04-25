import React, { useEffect } from "react";
import Navbar from "./navbar/Navbar";
import Page from "./page/Page";
import View from "./view/View";
import {useDispatch, useSelector} from "react-redux";
import "./Chat.scss";
import {fetchUser} from "../store/currentUser/reducers";
import WebSocket from "./WebSocket/WebSocket";

const Chat = (props) => {

    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.currentUser);

    useEffect(() => {
        if (localStorage.getItem("accessToken") === null) {
            props.history.push("/login");
        }
        dispatch(fetchUser());
    }, []);



    // const loadCurrentUser = () => {
    //     getCurrentUser()
    //         .then((response) => {
    //             dispatch(fetchUser(response));
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };



    const logout = () => {
        localStorage.removeItem("accessToken");
        props.history.push("/login");
    };

    return (
        <section className="wrapper">
            <WebSocket/>
            <Navbar />
            <Page />
            <View />
        </section>
    );
};

export default Chat;