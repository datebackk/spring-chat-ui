import React from "react";
import "./Page.scss"
import Chats from "./chats/Chats";
import PropTypes, {object} from "prop-types";
import Users from "./users/Users";

const Page = ({activeTab}) => {
    return (
        <section className="pages">
            <div className="page">
                <div className="page__content">
                    {activeTab.users.isActive ? <Users/> : null}
                    {activeTab.chats.isActive ? <Chats dialog={[{name: 1}, {name: 2}]}/> : null}
                    {activeTab.users_add.isActive ? null: null}
                </div>
            </div>
        </section>
    );
};

Page.prototype = {
    activeTab: PropTypes.object.isRequired
}

export default Page;