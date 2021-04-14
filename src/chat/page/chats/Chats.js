import React, {useEffect} from "react";
import ChatCard from "./ChatCard/ChatCard";
import PropTypes, {object} from "prop-types";


const Chats = ({dialog, openDialog}) => {
    return dialog.map((item, key) => <ChatCard key={key} name={item.name} openDialog={openDialog} />)
};

Chats.prototype = {
    openDialog: PropTypes.func.isRequired
}
export default Chats;