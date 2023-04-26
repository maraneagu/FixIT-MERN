import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import React from 'react';
import { setUser } from "state";

// const initialValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     location: "",
//     picture: "",
//     isClient: true,
// };

// const Form = ({ userId }) => {
//     const { palette } = useTheme();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const isNonMobile = useMediaQuery("(min-width:600px)");

//     const [user, setUser] = useState(null);
//     const token = useSelector((state) => state.token);

//     // const getUser = async () => {
//     //     const response = await fetch(`http://localhost:3001/users/${userId}`, {
//     //         method: "GET",
//     //         headers: { Authorization: `Bearer ${token}` },
//     //     });
//     //     const data = await response.json();
//     //     setUser(data);
//     // };
// }

const EditUserForm = ({ userId }) => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          throw new Error('Error fetching user data');
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };
  
    getUser();
  }, [userId, token]);
  
  const initialValues = {
    firstName: user?.firstName || '',
  };

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/edit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      console.log(response)

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        alert('User updated successfully');
      } else {
        throw new Error('Error updating user');
      }
    } catch (error) {
      alert(error.message);
    } 
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <Field type="text" name="firstName" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default EditUserForm;

