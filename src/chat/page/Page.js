import React from "react";
import "./Page.scss"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Chat from "../Chat";
import Signin from "../../signin/Signin";
import Signup from "../../signup/Signup";
import Chats from "./chats/Chats";

const Page = (props) => {
    return (
        <section className="pages">
            <div className="page">
                <div className="page__content">
                    <Chats dialog={[
                        {
                            name: 1
                        },
                        {
                            name: 2
                        }
                    ]}/>
                </div>
            </div>
        </section>
    );
};
export default Page;