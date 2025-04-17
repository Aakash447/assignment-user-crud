"use client";

import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { createUser, updateUser } from "../utils/api";



const UserModal = ({
  mode,
  initialUser,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<User>({
    user: "",
    email: "",
    interest: [],
    age: null,
    mobile: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialUser) {
      setFormData({ ...initialUser });
    } else {
      setFormData({
        user: "",
        email: "",
        interest: [],
        age: null,
        mobile: null,
      }); // Reset form
    }
  }, [initialUser, mode]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.user.trim()) {
      newErrors.user = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInterestChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      interest: value.split(",").map((item) => item.trim()),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (mode === "add") {
        await createUser(formData);
      } else {
        await updateUser(formData._id, formData);
      }
      onSave(); // Refresh the user list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Modal.Body>
        <div>
          <section className="d-flex p-2" style={{ justifyContent:'space-around'  }}>
            <label htmlFor="user">Name:</label>
            <div>
              <input
                className="form-control"
                type="text"
                id="user"
                name="user"
                value={formData.user}
                onChange={handleChange}
                required
              />
              {errors.user && <p className="error">{errors.user}</p>}
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
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
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
                value={formData.age || ""}
                onChange={handleChange}
              />
              {errors.age && <p className="error">{errors.age}</p>}
            </div>
          </section>
        </div>
        <div>
          <section className="d-flex p-2" style={{ justifyContent:'space-around'  }}>
            <label htmlFor="mobile">Mobile:</label>
            <div>
              <input
                className="form-control"
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile || ""}
                onChange={handleChange}
              />
              {errors.mobile && <p className="error">{errors.mobile}</p>}
            </div>
          </section>
        </div>
        <div>
          <section className="d-flex p-2" style={{ justifyContent:'space-around' }}>
              <label htmlFor="interest">Interests :</label>
            <div>
              <input
                className="form-control"
                type="text"
                id="interest"
                name="interest"
                value={formData.interest.join(", ")}
                onChange={handleInterestChange}
              />
            </div>
          </section>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {mode === "add" ? "Add User" : "Update User"}
        </Button>
      </Modal.Footer>

      <style jsx>{`
        .error {
          color: red;
        }
      `}</style>
    </form>
  );
};

export default UserModal;
