import React from "react";
import "./LogoutBtn.scss"
import { useHistory } from "react-router";

const LogoutBtn = (props) => {

    let history = useHistory();

    const logout = () => {
        localStorage.removeItem("accessToken");
        history.push("/login")
    };


    return (
        <button className="logout_btn" onClick={() => logout()}>
            <span>Выход</span>
            <i className='mdi mdi-logout'/>
        </button>
    )
}

export default LogoutBtn;