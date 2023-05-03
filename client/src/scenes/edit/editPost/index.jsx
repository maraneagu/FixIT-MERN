import EditNavbar from "scenes/edit/editNavbar";
import Form from "scenes/edit/editPost/Form";
import {
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import React from 'react';

const EditPost = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { postId } = useParams();

  return (
    <Box>
      <EditNavbar />
      <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.login.box}
        >
        <Form postId={postId}/>
      </Box>
    </Box>
  );
};

export default EditPost;