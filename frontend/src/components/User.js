import React from "react";
import Table from 'react-bootstrap/Table';


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <Table striped bordered hover>
            <thead>
                <th>
                    First Name
                </th>
                <th>
                    Last Name
                </th>
                <th>
                    Email
                </th>
            </thead>
            {users.map((user) => <UserItem user={user} />)}
        </Table>
    )
}

export default UserList