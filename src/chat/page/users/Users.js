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
        <>
            <input type="text" onChange={findByNickname}/>
            {users.map((item, key) => <UserCard user={item} key={key} />)}
        </>
    );
};

export default Users;