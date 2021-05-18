import React, {useEffect} from "react";
import "./View.scss"
import Message from "./message/Message";
import MessageForm from "./MessageFrom/MessageForm";
import Header from "./header/Header";
import {useDispatch, useSelector} from "react-redux";
import {setMessages} from "../../store/page/chats/messages/actions";
import ScrollableFeed from 'react-scrollable-feed'
import {getChatMessages} from "../../util/messageUtil";

const View = (props) => {

    const currentDialogMessages = useSelector(state => state.currentDialogMessages);
    const dispatch = useDispatch();

    const currentDialog = useSelector(state => state.view);

    useEffect(() => {
        if (currentDialog.action === "UPDATE") {
            console.log(currentDialog)
            loadChatMessages();
        } else {
            dispatch(setMessages([]))
        }
    }, [currentDialog]);

    const loadChatMessages = () => {
        getChatMessages(currentDialog.details.chatId)
            .then((response) => {
                console.log(currentDialog.details.chatId, response)
                dispatch(setMessages(response));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <section className="view">
            <div className="chat">
                <div className="chat__content">

                    {Object.keys(currentDialog.details).length !== 0 ? <Header /> : null}


                        <ScrollableFeed className={"chat__messages container style-1"}>
                            {currentDialogMessages.map((item, key) => <Message key={key} messageDetails={item}/>)}
                        </ScrollableFeed>



                    <div className="chat__footer container">
                        {Object.keys(currentDialog.details).length !== 0 ? <MessageForm /> : null}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default View;