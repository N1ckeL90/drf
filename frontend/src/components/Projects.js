import React from "react";
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";



const ProjectItem = ({item, deleteProject}) => {
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.linkRepo}</td>
            <td>{item.usersInvolved.map((user) => {return <span>{user}</span>})}</td>
            <td><button onClick={ ()=>deleteProject(item.id) } type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectsList = ({items, deleteProject}) => {
    return (
        <div>
        <Table striped bordered hover>
            <thead>
                <th>Project name</th>
                <th>Link</th>
                <th>Users involved</th>
                <th></th>
            </thead>
            {items.map((item) => <ProjectItem item={item} deleteProject={deleteProject} />)}
        </Table>

        <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectsList