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
import FlexBetween from "components/FlexBetween";
import { setUser } from "state";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";


const EditUserForm = ({ userId }) => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const navigate = useNavigate();

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
    lastName: user?.lastName || '',
    location: user?.location || '',
    bio: user?.bio || '',
    
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

      //console.log(response)

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        //alert('User updated successfully');
        navigate(`/profile/${userId}`);
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
      <Form>
        <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >

                  <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />

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

                <TextField
                  label="Bio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bio}
                  name="bio"
                  error={Boolean(touched.bio) && Boolean(errors.bio)}
                  helperText={touched.bio && errors.bio}
                  sx={{ gridColumn: "span 4" }}
                />

          <Box sx={{ gridColumn: "span 4", placeSelf: "center" }}>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.login.button,
                color: palette.background.alt,
                "&:hover": { backgroundColor: palette.login.buttonHover,
                             color: palette.login.buttonTextHover },
              }}
            >
              Edit profile
            </Button>
            </Box>
        </Box>
      </Form>)}
    </Formik>
  );
};

export default EditUserForm;

