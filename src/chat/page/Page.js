import React from "react";
import "./Page.scss"
import Chats from "./chats/Chats";
import PropTypes from "prop-types";
import Users from "./users/Users";

const Page = ({currentUser, activeTab, openDialog}) => {
    return (
        <section className="pages">
            <div className="page">
                <div className="page__content">
                    {activeTab.users.isActive ? <Users/> : null}
                    {activeTab.chats.isActive ? <Chats currentUser={currentUser} openDialog={openDialog}/> : null}
                    {activeTab.users_add.isActive ? null: null}
                </div>
            </div>
        </section>
    );
};

Page.prototype = {
    currentUser: PropTypes.object.isRequired,
    activeTab: PropTypes.object.isRequired,
    openDialog: PropTypes.func.isRequired
}

export default Page;