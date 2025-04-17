'use client';

import React from 'react';
import { Button, Table } from 'react-bootstrap';

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
      </thead>
      <tbody>

      {users.map((user) => (
          <tr key={user._id}>
            <td>{user.user}</td>
            <td>{user.email}</td>
            <td>
              <Button variant="info" onClick={() => onEdit(user)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => onDelete(user._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}

      </tbody>
    </Table>
  );
};

export default UserTable;