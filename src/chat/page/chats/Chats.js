import React, {useEffect} from "react";
import {getUserChats} from "../../../util/ApiUtil";
import ChatCard from "./ChatCard/ChatCard";


const Chats = (props) => {
    return props.dialog.map((item, key) => <ChatCard key={key} name={item.name} />)
};

export default Chats;