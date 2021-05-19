import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SockJS from "sockjs-client";
import {newStompclient} from "../../store/stomClient/reducers";
import {addMessage, updateMessageStatus} from "../../store/page/chats/messages/actions";
import {store} from "../../store/store";
import {addChat, setChats, softUpdate, strongUpdate} from "../../store/page/chats/actions";
import {getUserChats} from "../../util/chatsUttil";
import {message} from "antd";


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
        if (currentUser.id) {
            stompClient.subscribe("/topic/messages/" + currentUser.id, onMessageReceived);
            stompClient.subscribe("/topic/messages-status/" + currentUser.id, onMessageUpdate);
            stompClient.subscribe("/topic/public", onMessageReceived);
        } else {
            window.location('/');
        }
    };

    const onMessageReceived = (msg) => {
        const currentUser = store.getState().currentUser;
        const currentDialog = store.getState().view;
        const chats = store.getState().chats;
        console.log(msg.body)
        const incomingMessage = JSON.parse(msg.body)
        let currentChat = chats.filter((item) => item.chatId === incomingMessage.chatId);

        if (incomingMessage.senderId === currentUser.id && currentDialog.details.chatId === 'public') {
            dispatch(softUpdate(currentChat[0], incomingMessage))
            return;
        }

        if (currentChat.length === 0) {
            getUserChats()
                .then(response => {
                currentChat = response.filter((item) => item.chatId === incomingMessage.chatId)
                dispatch(setChats(response))
            })
            .catch(error => {
                message.error(error.message);
            })
            return;
        }

        if (currentDialog.details.chatId === incomingMessage.chatId) {
            if (currentChat.length !== 0) {
                dispatch(softUpdate(currentChat[0], incomingMessage))
            }
            dispatch(addMessage(JSON.parse(msg.body)));
        } else {
            dispatch(strongUpdate(currentChat[0], incomingMessage))
        }
    }

    const onMessageUpdate = (msg) => {
        const currentDialog = store.getState().view;
        const incomingMessage = JSON.parse(msg.body);
        if (currentDialog.details.chatId === incomingMessage.chatId) {
            dispatch(updateMessageStatus(JSON.parse(msg.body)));
        }

    }

    const onError = (error) => {
        message.error(error);
        console.log(error);
    };

    return null;
}

export default WebSocket