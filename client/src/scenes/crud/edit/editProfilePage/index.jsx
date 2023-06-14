import Navbar from "components/navbar";
import Form from "scenes/crud/edit/editProfilePage/Form";
import {
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import React from 'react';

const EditProfilePage = () => {
  const theme = useTheme();

  // Check if the screen width is greater than or equal to 1000px
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // Access the _id from the user in the Redux store
  const { _id } = useSelector((state) => state.user);

  return (
    <Box>
      {/* Render the navbar component */}
      <Navbar />

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.login.box}
      >
        {/* Render the form component */}
        <Form userId={_id}/>
      </Box>
    </Box>
  );
};

export default EditProfilePage;
