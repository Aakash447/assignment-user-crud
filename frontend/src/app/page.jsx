'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Container, Form, Modal } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';
import CustomModel from '../components/CustomModel'
import { deleteUser, getUsers } from '../utils/api';
import { API_BASE_URL } from '../services/api';
import axios from 'axios';

const AddUser  =  ({handleShow}) => {
  return (
    <Button variant="primary" size="sm" onClick={handleShow}>
        Add New User
    </Button>
  )
}

const AddUserContent =  ({ handleClose }) => {
   const [loading,setLoading] = useState(false)

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
  console.log('userFormErrors:',userFormErrors)

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

      if(errors.name || errors.email || errors.age || errors.mobile || errors.interests ){
        setUserFormErrors(errors)
        return false
      }
      return true
  }

  const handleSubmit = async () => {

    try {
      const isValid = validation()
      console.log('isValid:',isValid)

      if(!isValid){
        return 
      }
      setLoading(true)
      const payload = {
        name: userForm?.name,
        interests: userForm?.interests,
        age: userForm?.age,
        mobile: userForm?.mobile,
        email: userForm?.email,
      }
      console.log("payload",payload)
      const response = await axios.post(API_BASE_URL,payload);
      console.log('response:',response)
      handleClose()
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }finally{
      setLoading(false)
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
              {
                loading ? 'Loading...' : 'Submit'
              }
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
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedUser, setSelectedUser] = useState(null);

  

  const getUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get(API_BASE_URL);
      setUsers(response.data)

    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }finally{
      setLoading(false)

    }
  };

  useEffect(() => {
    getUsers();
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

 

  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(API_BASE_URL+'/' + id);
      getUsers()
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }finally{

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
    loading={loading}
    onEdit={handleShowEditModal}
    onDelete={handleDeleteUser} // Pass delete function
  />

  

  
</Container>
  );
};

export default HomePage;


