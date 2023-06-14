import Navbar from "components/navbar";
import Form from "scenes/crud/create/createPostPage/Form";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import React from "react";

const CreatePostPage = () => {
  // Access the theme and media query functions from Material-UI
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // Retrieve the user ID from the Redux store
  const { _id } = useSelector((state) => state.user);

  return (
    <Box>
      {/* Render the navigation bar component */}
      <Navbar />
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.login.box}
      >
        {/* Render the form component for creating a post */}
        <Form userId={_id} />
      </Box>
    </Box>
  );
};

export default CreatePostPage;
