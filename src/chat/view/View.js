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
    const currentDialogMessagesDispatcher = useDispatch();

    const currentDialog = useSelector(state => state.view);

    useEffect(() => {
        loadChatMessages();
    }, [currentDialog]);

    const loadChatMessages = () => {
        getChatMessages(currentDialog.details.chatId)
            .then((response) => {
                currentDialogMessagesDispatcher(setMessages(response));
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


                        {/*<div className="chat__messages container">*/}
                        <ScrollableFeed className={"chat__messages container"}>
                            {currentDialogMessages.map((item, key) => <Message key={key} messageDetails={item}/>)}
                        </ScrollableFeed>
                        {/*</div>*/}



                    <div className="chat__footer container">
                        {Object.keys(currentDialog.details).length !== 0 ? <MessageForm /> : null}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default View;