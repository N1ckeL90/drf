import React from "react";
import Table from 'react-bootstrap/Table';


const ProjectItem = ({item}) => {
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.linkRepo}</td>
            <td>{item.usersInvolved.map((user) => {return <span>{user.username}</span>})}</td>
        </tr>
    )
}

const ProjectsList = ({items}) => {
    return (
        <Table striped bordered hover>
            <thead>
                <th>Project name</th>
                <th>Link</th>
                <th>Users involved</th>
            </thead>
            {items.map((item) => <ProjectItem item={item} />)}
        </Table>
    )
}

export default ProjectsList