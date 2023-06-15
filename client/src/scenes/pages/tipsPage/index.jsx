import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "components/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import TipsWidget from "scenes/widgets/tipWidgets/TipsWidget";
import { Button } from "@mui/material";
import React from 'react';
import { useNavigate } from "react-router-dom";

const TipsPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)"); // Check if the screen width is greater than 1000px
  const { picturePath } = useSelector((state) => state.user); // Get the user's picture path from the Redux store
  const { isClient } = useSelector((state) => state.user); // Check if the user is a client
  const { palette } = useTheme(); // Get the theme palette
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const user = useSelector((state) => state.user); // Get the user object from the Redux store
  const userId = user._id; // Get the user ID

  return ( 
    <Box>
      <Navbar /> {/* Render the navbar component */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"} // Set the display property based on the screen size
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={picturePath} /> {/* Render the user widget component and pass the user ID and picture path as props */}

          <Box m="2.3em" />

          {!isClient && (
            <Button
              onClick={() => navigate(`/createtip/${userId}`)} // Navigate to the create tip page for the current user
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "0.7rem",
                fontSize: 15,
                width: "100%",
              }}
            >
              Add a tip
            </Button>
          )}
        </Box>

        <Box
          width={isNonMobileScreens ? "47%" : undefined}
          mt={isNonMobileScreens ? "-30px" : "1.5rem"}
          ml={isNonMobileScreens ? "30px" : undefined}
        >
          <TipsWidget userId={userId}/> {/* Render the tips widget component and pass the user ID as a prop */}
        </Box>
      </Box>
    </Box>
  );
};

export default TipsPage;
