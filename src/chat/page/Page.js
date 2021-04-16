import React from "react";
import "./Page.scss"
import Chats from "./chats/Chats";
import Users from "./users/Users";
import {useSelector} from "react-redux";

const Page = (props) => {

    const activeTab = useSelector(state => state.navbar);

    return (
        <section className="pages">
            <div className="page">
                <div className="page__content">
                    {activeTab.users.isActive ? <Users/> : null}
                    {activeTab.chats.isActive ? <Chats/> : null}
                    {activeTab.users_add.isActive ? null: null}
                </div>
            </div>
        </section>
    );
};

export default Page;