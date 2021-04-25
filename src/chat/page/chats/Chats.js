import React, {useEffect} from "react";
import ChatCard from "./ChatCard/ChatCard";
import {useDispatch, useSelector} from "react-redux";
import {setChats} from "../../../store/page/chats/actions";
import {getUserChats} from "../../../util/chatsUttil";


const Chats = (props) => {

    const userChats = useSelector(state => state.chats);
    const chatsDispatch = useDispatch();

    useEffect(() => {
        loadChats();
    }, []);

    const loadChats = () => {
        getUserChats()
            .then((response) => {
                chatsDispatch(setChats(response));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        userChats.length !== 0 ? (
            userChats.map((item, key) => <ChatCard key={key} cardDetails={item} />)
        ) : (
            <h1>У вас нет диалогов</h1>
        )
    )
};

export default Chats;