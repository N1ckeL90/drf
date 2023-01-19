import React from "react";
import Table from 'react-bootstrap/Table';


const ToDoItem = ({item}) => {
    return (
        <tr>
            <td>{item.project.name}</td>
            <td>{item.noteText}</td>
            <td>{item.author.username}</td>
            <td>{item.created}</td>
            <td>{item.updated}</td>
        </tr>
    )
}

const ToDoList = ({items}) => {
    return (
        <Table striped bordered hover>
            <thead>
                <th>Project name</th>
                <th>Note</th>
                <th>Author</th>
                <th>Created at</th>
                <th>Updated at</th>
            </thead>
            {items.map((item) => <ToDoItem item={item} />)}
        </Table>
    )
}

export default ToDoList