'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Container, Form, Modal } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';
import CustomModel from '../components/CustomModel'
import { deleteUser, getUsers } from '../utils/api';

const AddUser  =  ({handleShow}) => {
  return (
    <Button variant="primary" size="sm" onClick={handleShow}>
        Add New User
    </Button>
  )
}

const AddUserContent =  ({ handleClose }) => {
  const [userForm,setUserForm] = useState({
    name:'',
    email:'',
    age:'',
    mobile:'',
    interests:''
  })

  const [userFormErrors,setUserFormErrors] = useState({
    name:'',
    email:'',
    age:'',
    mobile:'',
    interests:''
  })

  console.log('>>>> userForm:',userForm)

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name] : e.target.value
    })
  }

  function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const validation = () => {
    let errors = {
      name:'',
      email:'',
      age:'',
      mobile:'',
      interests:''
    }
    

      if(!userForm.name){
        errors.name = 'Name is required!'
      }
      const is_email_valid = isValidEmail(userForm.email)
      if(!userForm.email){
        errors.email = 'Email is required!'
      }else

      
      if(!is_email_valid){
          errors.email = 'Invalid email!'
      }

      if(!userForm.age){
        errors.age = 'Age is required!'
      }else
      if(userForm.age < 0 || userForm.age > 100 ){
        errors.age = 'Incorrect age!'
      }

      if(!userForm.mobile){
        errors.mobile = 'Mobile is required!'
      }else
      if(userForm.mobile.length < 4 ){
        errors.mobile = 'Invalid number'
      }else
      if(userForm.mobile.length > 14 ){
        errors.mobile = 'Invalid number'
      }
      if(!userForm.interests){
        errors.interests = 'Interests is required!'
      }

      if(errors.name || userForm.email || userForm.age || userForm.mobile || userForm.interests ){
        setUserFormErrors(errors)
        return false
      }
      return true
  }

  const handleSubmit = () => {
    const isValid = validation()
    if(!isValid){
      return 
    }

  }
  return (
      <div >
          <Modal.Body>
            <div>
              <section className="d-flex p-2" style={{ justifyContent:'space-around'  }}>
                <label htmlFor="user">Name:</label>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={userForm.name}
                    onChange={handleChange}
                    required
                  />
                  {userFormErrors.name && <p className="error">{userFormErrors.name}</p>}
                </div>
              </section>
            </div>
            <div>
              <section className="d-flex p-2" style={{ justifyContent:'space-around'  }}>
                <label htmlFor="email">Email:</label>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="email"
                    name="email"
                    value={userForm.email}
                    onChange={handleChange}
                    required
                  />
                  {userFormErrors.email && <p className="error">{userFormErrors.email}</p>}
                </div>
              </section>
            </div>
            <div>
              <section className="d-flex p-2" style={{ justifyContent:'space-around'  }}>
                <label htmlFor="age">Age:</label>
                <div>
                  <input
                    className="form-control"
                    type="number"
                    id="age"
                    name="age"
                    value={userForm.age}
                    onChange={handleChange}
                  />
                  {userFormErrors.age && <p className="error">{userFormErrors.age}</p>}
                </div>
              </section>
            </div>
            <div>
              <section className="d-flex p-2" style={{ justifyContent:'space-around'  }}>
                <label htmlFor="mobile">Mobile:</label>
                <div>
                  <input
                    className="form-control"
                    type="number"
                    id="mobile"
                    name="mobile"
                    value={userForm.mobile}
                    onChange={handleChange}
                  />
                  {userFormErrors.mobile && <p className="error">{userFormErrors.mobile}</p>}
                </div>
              </section>
            </div>
            <div>
              <section className="d-flex p-2" style={{ justifyContent:'space-around' }}>
                  <label htmlFor="interest">Interests :</label>
                <div>
                  <Form.Select name='interests' aria-label="Default select example" onChange={handleChange} >
                      <option>Select interests</option>
                      <option value="comics">Comics</option>
                      <option value="sports">Sports</option>
                  </Form.Select>
                  {userFormErrors.interests && <p className="error">{userFormErrors.interests}</p>}

                </div>
              </section>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
          <style jsx>{`
            .error {
              color: red;
            }
          `}</style>
        </div>
  )
}

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleShowAddModal = () => {
    setModalMode('add');
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleShowEditModal = (user) => {
    setModalMode('edit');
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const refreshUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      refreshUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Container className='mt-4' >
  <section className='d-flex  ' style={{ justifyContent:'space-between' }}> 
    <h1>User List</h1>
    

    <CustomModel trigger={<AddUser/>} childrenComp={<AddUserContent/>} title="Add User" />

  </section>

  <UserTable
    users={users}
    onEdit={handleShowEditModal}
    onDelete={handleDeleteUser} // Pass delete function
  />

  

  <Link href="/new">Go to detail page</Link>
</Container>
  );
};

export default HomePage;


