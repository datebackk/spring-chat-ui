import React, { useState } from 'react';
import MaterialTable from 'material-table'

const empList = [
    { id: 1, name: "Neeraj", email: 'neeraj@gmail.com', phone: "hi", city: "Bangalore" },
    { id: 2, name: "Raj", email: 'raj@gmail.com', phone: "hi", city: "Chennai" },
    { id: 3, name: "David", email: 'david342@gmail.com', phone: "hi", city: "Jaipur" },
    { id: 4, name: "Vikas", email: 'vikas75@gmail.com', phone: "hi", city: "hi" },
]

function Admin(props) {

    const [data, setData] = useState(empList)
    const columns = [
        { title: "ID", field: "id", editable: false },
        { title: "Name", field: "name" },
        { title: "Email", field: "email" },
        { title: "Message", field: 'phone', },
    ]


    return (
        <div className="App">
            <h1 align="center">Панель Администратора</h1>
            <MaterialTable
                title="Сообщения"
                data={data}
                columns={columns}
                editable={{
                    onRowAdd: (newRow) => new Promise((resolve, reject) => {
                        const updatedRows = [...data, { id: Math.floor(Math.random() * 100), ...newRow }]
                        setTimeout(() => {
                            setData(updatedRows)
                            resolve()
                        }, 2000)
                    }),
                    onRowDelete: selectedRow => new Promise((resolve, reject) => {
                        const index = selectedRow.tableData.id;
                        const updatedRows = [...data]
                        updatedRows.splice(index, 1)
                        setTimeout(() => {
                            setData(updatedRows)
                            resolve()
                        }, 2000)
                    }),
                    onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
                        const index=oldRow.tableData.id;
                        const updatedRows=[...data]
                        updatedRows[index]=updatedRow
                        setTimeout(() => {
                            setData(updatedRows)
                            resolve()
                        }, 2000)
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