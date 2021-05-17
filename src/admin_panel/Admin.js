import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table'
import {fetchUser} from "../store/currentUser/reducers";
import {deleteAdminMessage, getAdminMessages, updateAdminMessage} from "../util/messageUtil";
import {message} from "antd";
import {useDispatch, useSelector} from "react-redux";

// const empList = [
//     { id: 1, name: "Neeraj", email: 'neeraj@gmail.com', phone: "hi", city: "Bangalore" },
//     { id: 2, name: "Raj", email: 'raj@gmail.com', phone: "hi", city: "Chennai" },
//     { id: 3, name: "David", email: 'david342@gmail.com', phone: "hi", city: "Jaipur" },
//     { id: 4, name: "Vikas", email: 'vikas75@gmail.com', phone: "hi", city: "hi" },
// ]

function Admin(props) {

    const [data, setData] = useState();
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.currentUser);

    const columns = [
        { title: "ID", field: "id", editable: false },
        { title: "chatID", field: "chatId", editable: false },
        { title: "senderId", field: "senderId", editable: false },
        { title: "recipientId", field: 'recipientId', editable: false },
        { title: "date", field: 'date', editable: false},
        { title: "message", field: 'message'},
        { title: "status", field: 'status', editable: false},
    ]

    useEffect(() => {
        if (localStorage.getItem("accessToken") === null) {
            props.history.push("/login");
        }
        dispatch(fetchUser());

        getAdminMessages()
            .then(response => {
                setData(response)
            })
            .catch(error => {
                message.error(error.message);
            })
    }, []);

    if (currentUser.roles[0].name !== "ADMIN") {
        props.history.push("/")
    }

    return (
        <div className="App">
            <h1 align="center">Панель Администратора</h1>
            <MaterialTable
                title="Сообщения"
                data={data}
                columns={columns}
                editable={{
                    onRowDelete: selectedRow => new Promise((resolve, reject) => {
                        const index = selectedRow.tableData.id;
                        const updatedRows = [...data]
                        updatedRows.splice(index, 1)

                        deleteAdminMessage(selectedRow)
                            .then(() => {
                                setData(updatedRows)
                                resolve()
                            })
                            .catch(error => {
                                if (error.message == "Unexpected end of JSON input") {
                                    setData(updatedRows)
                                    resolve()
                                } else {
                                    message.error(error.message);
                                    reject()
                                }
                            })
                    }),
                    onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
                        const index=oldRow.tableData.id;
                        const updatedRows=[...data]
                        updatedRows[index]=updatedRow
                        updateAdminMessage(updatedRow)
                            .then(response => {
                                setData(updatedRows)
                                resolve()
                            })
                            .catch(error => {
                                message.error(error.message);
                                reject()
                            })
                    })

                }}
                options={{
                    actionsColumnIndex: -1, addRowPosition: "first"
                }}
            />
        </div>
    );
}

export default Admin;