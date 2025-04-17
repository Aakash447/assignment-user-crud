'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUser, updateUser, getUserById } from '../utils/api';

// interface User {
//   _id?: string;
//   user: string;
//   email: string;
//   interest: string[];
//   age: number | null;
//   mobile: string | null;
// }

// interface UserFormProps {
//   userId?: string;
// }

const UserForm = ({ userId }) => {
  const [formData, setFormData] = useState<User>({
    user: '',
    email: '',
    interest: [],
    age: null,
    mobile: null,
  });
  const [errors, setErrors] = useState({}); // For validation errors
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const userData = await getUserById(userId);
          setFormData(userData);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
      fetchUser();
    }
  }, [userId]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.user.trim()) {
      newErrors.user = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInterestChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, interest: value.split(',').map(item => item.trim()) }); // Trim interests
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (userId) {
        await updateUser(userId, formData);
      } else {
        await createUser(formData);
      }
      router.push('/');
    } catch (error) {
      // Type assertion to 'any' to access 'response'
      if (error.response && error.response.data) {
        console.error('Error saving user:', error.response.data);
        // You could set an error message to display to the user here
      } else {
        console.error('Error saving user:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="user">Name:</label>
        <input type="text" id="user" name="user" value={formData.user} onChange={handleChange} required />
        {errors.user && <p className="error">{errors.user}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" value={formData.age || ''} onChange={handleChange} />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>
      <div>
        <label htmlFor="mobile">Mobile:</label>
        <input type="text" id="mobile" name="mobile" value={formData.mobile || ''} onChange={handleChange} />
        {errors.mobile && <p className="error">{errors.mobile}</p>}
      </div>
      <div>
        <label htmlFor="interest">Interests (comma separated):</label>
        <input type="text" id="interest" name="interest" value={formData.interest.join(', ')} onChange={handleInterestChange} />
      </div>
      <button type="submit">{userId ? 'Update User' : 'Add User'}</button>

      <style jsx>{`
        .error {
          color: red;
        }
      `}</style>
    </form>
  );
};

export default UserForm;