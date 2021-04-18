import React, { useEffect } from "react";
import {getCurrentUser} from "../util/ApiUtil";
import Navbar from "./navbar/Navbar";
import Page from "./page/Page";
import View from "./view/View";
import {useDispatch, useSelector} from "react-redux";
import "./Chat.scss";
import {fetchUser} from "../store/currentUser/reducers";

var stompClient = null;
const Chat = (props) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);

    useEffect(() => {
        if (localStorage.getItem("accessToken") === null) {
            props.history.push("/login");
        }
        dispatch(fetchUser());
        connect();
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


    const connect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS("http://localhost:8080/chat");
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, onConnected, onError);
    };


    const onConnected = () => {
        console.log("connected");
        console.log(currentUser);
        stompClient.subscribe("/chat/messages/" + 6, onMessageReceived);
    };

    const onMessageReceived = (msg) => {
        console.log(msg);
    }

    const onError = (err) => {
        console.log(err);
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