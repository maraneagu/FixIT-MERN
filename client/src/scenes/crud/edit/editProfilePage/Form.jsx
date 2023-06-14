import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  InputLabel,
} from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser as setUserRedux } from "state";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexBetween from "components/FlexBetween";

const EditUserForm = ({ userId }) => {
  // State for storing the user data
  const [user, setUser] = useState(null);

  // Access the token from the Redux store
  const token = useSelector((state) => state.token);

  // Access the theme and navigation functions from Material-UI
  const { palette } = useTheme();
  const navigate = useNavigate();

  // Access the Redux dispatch function
  const dispatch = useDispatch();

  // Fetch user data from the server upon component mount
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          throw new Error("Error fetching user data");
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    getUser();
  }, [userId, token]);

  // Set the initial form values based on the user data
  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
    bio: user?.bio || "",
    picturePath: user?.picturePath || "",
  };

  // Log the picturePath value to the console
  console.log(initialValues.picturePath);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("location", values.location);
      formData.append("bio", values.bio);

      // Check if the picturePath value has changed
      if (values.picturePath.name)
        formData.append("picturePath", values.picturePath.name);
      else formData.append("picturePath", values.picturePath);
      console.log("FormData :", formData.firstName);

      const response = await fetch(
        `http://localhost:3001/users/${userId}/edit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        dispatch(setUserRedux({ user: data }));
        navigate(`/profile/${userId}`);
      } else {
        throw new Error("Error updating user");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Render loading message if user data is not available yet
  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "15px",
          marginTop: "4rem",
        }}
      >
        Loading...
      </div>); // Render a loading state while fetching data
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
            {/* First Name field */}
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

            {/* Last Name field */}
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

            {/* Location field */}
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

            {/* Bio field */}
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

            {/* Profile Picture field */}
            <InputLabel id="picture-label" sx={{ marginBottom: "-22px" }}>
              Profile Picture
            </InputLabel>
            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
              name="picturePath"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("picturePath", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    {/* Display the current picture path or the new file name */}
                    {!values.picturePath.name ? (
                      <FlexBetween>
                        <Typography>{values.picturePath}</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.picturePath.name}</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                    <input {...getInputProps()} />
                  </Box>
                )}
              </Dropzone>
            </Box>

            {/* Edit profile button */}
            <Box sx={{ gridColumn: "span 4", placeSelf: "center" }}>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "0.5rem 0",
                  p: "1rem",
                  backgroundColor: palette.login.button,
                  color: palette.background.alt,
                  "&:hover": {
                    backgroundColor: palette.login.buttonHover,
                    color: palette.login.buttonTextHover,
                  },
                }}
              >
                Edit profile
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default EditUserForm;
