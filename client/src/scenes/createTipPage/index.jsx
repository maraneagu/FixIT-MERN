import Navbar from "scenes/navbar";
import Form from "scenes/createTipPage/Form";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import React from "react";

const CreateTipPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.login.box}
      >
        <Form userId={_id} />
      </Box>
    </Box>
  );
};

export default CreateTipPage;
