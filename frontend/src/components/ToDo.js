import React from "react";
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";


const ToDoItem = ({item, deleteTodo}) => {
    return (
        <tr>
            <td>{item.project}</td>
            <td>{item.noteText}</td>
            <td>{item.author}</td>
            <td><button onClick={ ()=>deleteTodo(item.id) }>Delete</button></td>
        </tr>
    )
}

const ToDoList = ({items, deleteToDo}) => {
    return (
        <div>
        <Table striped bordered hover>
            <thead>
                <th>Project name</th>
                <th>Note</th>
                <th>Author</th>
                <th></th>
            </thead>
            {items.map((item) => <ToDoItem item={item} deleteTodo={deleteToDo}/>)}
        </Table>
        <Link to='/todo/create'>Create</Link>
        </div>
    )
}

export default ToDoList