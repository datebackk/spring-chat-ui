import React, {useState} from "react";
import UserCard from "./UserCard/UserCard";
import {getUsers} from "../../../util/userUtil";

const Users = (props) => {

    const [users, setUsers] = useState([]);

    const findByNickname = (e) => {
        getUsers(e.target.value)
            .then((response) => {
                setUsers(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <h2 className="page__title">Пользователи</h2>
            <div className="page__title__input__group">
                <input type="text" onChange={findByNickname}/>
                <button></button>
            </div>
            {users.map((item, key) => <UserCard user={item} key={key} />)}
        </div>
    );
};

export default Users;