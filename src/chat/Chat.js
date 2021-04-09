import React, { useEffect } from "react";
import {loggedInUser} from "../atom/globalState";
import {useRecoilState} from "recoil";
import {getCurrentUser} from "../util/ApiUtil";

const Chat = (props) => {

    const [currentUser, setLoggedInUser] = useRecoilState(loggedInUser);

    useEffect(() => {
        if (localStorage.getItem("accessToken") === null) {
            props.history.push("/login");
        }
        loadCurrentUser();
    }, []);


    const loadCurrentUser = () => {
        getCurrentUser()
            .then((response) => {
                setLoggedInUser(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        props.history.push("/login");
    };

    return (
        <h1>{currentUser.email}</h1>
    );
};

export default Chat;