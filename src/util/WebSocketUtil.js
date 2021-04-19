import SockJS from "sockjs-client";


var stompClient;
export const connect = () => {
    const Stomp = require("stompjs");
    const sockjs = new SockJS("http://localhost:8080/chat");
    stompClient = Stomp.over(sockjs);
    stompClient.connect({}, onConnected, onError);
};


const onConnected = () => {
    console.log("connected");
    const currentUser = JSON.parse(JSON.parse(sessionStorage.getItem('persist:session')).currentUser);
    stompClient.subscribe("/chat/messages/" + currentUser.id, onMessageReceived);
};

const onMessageReceived = (msg) => {
    console.log(msg);
}

const onError = (err) => {
    console.log(err);
};