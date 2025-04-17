"use client";

import React from "react";
import { Button, Table } from "react-bootstrap";

const UserTable = ({ users, onEdit, onDelete, loading }) => {
  console.log("##### users:", users);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Mobile</th>
          <th>Interests</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users?.length ? (
          <>
            {users.map((user, i) => (
              <tr key={user._id}>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.age}</td>
                <td>{user?.mobile}</td>
                <td>{user?.interests.join(", ")}</td>

                <td>
                  {/* <Button variant="info" onClick={() => onEdit(user)}>
                    View
                  </Button>
                  <Button variant="info" onClick={() => onEdit(user)}>
                    Edit
                  </Button> */}
                  <Button variant="danger" 
                  // onClick={() => onDelete(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </>
        ) : loading ? (
          <tr>
            <td colSpan={6} style={{ textAlign: "center" }}>
              Loading...
            </td>
          </tr>
        ) : (
          <tr>
            <td colSpan={6} style={{ textAlign: "center" }}>
              No records available
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default UserTable;
