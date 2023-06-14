import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import React from 'react';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

// Validation schema for registration form
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  picture: yup.string().required("required"),
  isClient: yup.boolean().required("required"),
});

// Validation schema for login form
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

// Initial values for registration form
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
  isClient: true,
};

// Initial values for login form
const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  // State for controlling the page type (login or register)
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Media query to check if the screen size is greater than or equal to 600px
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // Registration function to handle form submission
  const register = async (values, onSubmitProps) => {
    // Create a new FormData object
    const formData = new FormData();
    for (let value in values) {
      // Append form values to the formData object
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    // Send the form data to the server for registration
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );

    // Reset the form after submission
    onSubmitProps.resetForm();

    // If the user is successfully registered, change the page type to login
    if (savedUserResponse) {
      setPageType("login");
    }
  };

  // Login function to handle form submission
  const login = async (values, onSubmitProps) => {
    // Send the login credentials to the server for authentication
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    // Get the logged-in user and token from the server response
    const loggedIn = await loggedInResponse.json();

    // Reset the form after submission
    onSubmitProps.resetForm();

    // If the user is successfully logged in, dispatch the login action and navigate to the home page
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  // Function to handle form submission based on the current page type
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {/* Registration Fields */}
            {isRegister && (
              <>
                {/* First Name */}
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
  
                {/* Last Name */}
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
  
                {/* Location */}
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
  
                {/* Picture Upload */}
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
  
                {/* Role Selection */}
                <InputLabel id="role-label" sx={{ marginBottom: '-22px' }}>Role</InputLabel>
                <Select
                  value={values.isClient}
                  onBlur={handleBlur}
                  name="isClient"
                  error={Boolean(touched.isClient) && Boolean(errors.isClient)}
                  helperText={touched.isClient && errors.isClient}
                  onChange={(event) => {
                    const value = event.target.value === 'client' ? true : false;
                    setFieldValue('isClient', value);
                  }}
                  sx={{ gridColumn: 'span 4' }}
                >
                  <MenuItem value="client" ><PsychologyAltIcon style={{ marginRight: '9px', marginBottom: '-3px' }}/>Client</MenuItem>
                  <MenuItem value="master" ><EngineeringIcon style={{ marginRight: '9px', marginBottom: '-3px'}}/>Master</MenuItem>
                </Select>
              </>
            )}
  
            {/* Common Fields (for both Login and Registration) */}
            {/* Email */}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
  
            {/* Password */}
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
  
          </Box>
  
          {/* BUTTONS */}
          <Box>
            {/* Submit Button */}
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.login.button,
                color: palette.background.alt,
                "&:hover": {
                  backgroundColor: palette.login.buttonHover,
                  color: palette.login.buttonTextHover,
                },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
  
            {/* Link to Switch between Login and Registration */}
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.login.text,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.login.textHover,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );  
};

export default Form;
