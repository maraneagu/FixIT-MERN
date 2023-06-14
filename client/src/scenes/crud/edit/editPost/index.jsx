import Navbar from "components/navbar";
import Form from "scenes/crud/edit/editPost/Form";
import {
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import React from 'react';

const EditPost = () => {
  // Access the theme and media query functions from Material-UI
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // Retrieve the postId from the URL params
  const { postId } = useParams();

  return (
    <Box>
      {/* Render the Navbar component */}
      <Navbar />

      {/* Container for the edit post form */}
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.login.box}
      >
        {/* Render the Form component for editing the post */}
        <Form postId={postId}/>
      </Box>
    </Box>
  );
};

export default EditPost;
