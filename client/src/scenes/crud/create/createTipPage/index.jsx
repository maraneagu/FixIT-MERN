import Navbar from "components/navbar";
import Form from "scenes/crud/create/createTipPage/Form";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import React from "react";

const CreateTipPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // Check if the screen width is greater than 1000px
  const { _id } = useSelector((state) => state.user); // Get the user ID from the Redux store

  return (
    <Box>
      <Navbar /> {/* Render the navbar component */}
      <Box
        width={isNonMobileScreens ? "50%" : "93%"} // Set the width of the box based on the screen size
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.login.box} // Set the background color based on the theme
      >
        <Form userId={_id} /> {/* Render the create tip form component and pass the user ID as a prop */}
      </Box>
    </Box>
  );
};

export default CreateTipPage;
