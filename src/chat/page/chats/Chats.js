import React, {useEffect} from "react";
import ChatCard from "./ChatCard/ChatCard";
import PropTypes from "prop-types";
import {getUserChats} from "../../../util/ApiUtil";
import {useRecoilState} from "recoil";
import {chats} from "../../../atom/globalState";


const Chats = ({currentUser, openDialog}) => {

    const [userChats, setChats] = useRecoilState(chats);

    useEffect(() => {
        loadChats();
    }, []);

    const loadChats = () => {
        getUserChats()
            .then((response) => {
                setChats(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // console.log(typeof userChats, userChats, 111)
    // return <h1 style={{color: 'white'}}>Ghbd</h1>
    //
    console.log(userChats);
    return userChats.map((item, key) => <ChatCard key={key} currentUser={currentUser} cardDetails={item} openDialog={openDialog} />)
};

Chats.prototype = {
    currentUser: PropTypes.object.isRequired,
    openDialog: PropTypes.func.isRequired
}

export default Chats;