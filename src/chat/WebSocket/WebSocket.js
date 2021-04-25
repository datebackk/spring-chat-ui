import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SockJS from "sockjs-client";
import {newStompclient} from "../../store/stomClient/reducers";
import {addMessage, updateMessageStatus} from "../../store/page/chats/messages/actions";
import {store} from "../../store/store";
import {updateChats} from "../../store/page/chats/actions";


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
        stompClient.subscribe("/topic/messages-status/" + currentUser.id, onMessageUpdate);
    };

    const onMessageReceived = (msg) => {
        const currentDialog = store.getState().view;
        const chats = store.getState().chats;
        const incomingMessage = JSON.parse(msg.body)
        const currentChat = chats.filter((item) => item.chatId === incomingMessage.chatId);

        if (currentChat.length !== 0) {
            dispatch(updateChats(currentChat[0]))
        }

        if (currentDialog.details.chatId === incomingMessage.chatId) {
            dispatch(addMessage(JSON.parse(msg.body)));
        }
    }

    const onMessageUpdate = (msg) => {
        const currentDialog = store.getState().view;
        const incomingMessage = JSON.parse(msg.body);
        if (currentDialog.details.chatId === incomingMessage.chatId) {
            dispatch(updateMessageStatus(JSON.parse(msg.body)));
        }

    }

    const onError = (err) => {
        console.log(err);
    };

    return null;
}

export default WebSocket