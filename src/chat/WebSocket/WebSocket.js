import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SockJS from "sockjs-client";
import {newStompclient} from "../../store/stomClient/reducers";


const WebSocket = (props) => {

    const currentUser = useSelector(state => state.currentUser);

    const Stomp = require("stompjs");
    const [sockjs, setSockJs] = useState(new SockJS("http://localhost:8080/chat"));
    const [stompClient, setStompClient] = useState(Stomp.over(sockjs));
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(newStompclient(stompClient));
        stompClient.connect({}, onConnected, onError);
    }, [])

    const onConnected = () => {
        console.log("connected");
        stompClient.subscribe("/topic/messages/" + currentUser.id, onMessageReceived);
    };

    const onMessageReceived = (msg) => {
        console.log(msg);
    }

    const onError = (err) => {
        console.log(err);
    };

    return null;
}

export default WebSocket