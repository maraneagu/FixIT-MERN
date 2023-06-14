import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  // Get the current theme
  const theme = useTheme();

  // Check if the screen width is larger than 1000px
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box backgroundColor={theme.palette.background.main}>
      {/* Header */}
      <Box
        width="100%"
        backgroundColor={theme.palette.login.bar}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="login.barFont">
          FixIT
        </Typography>
      </Box>

      {/* Main Content */}
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.login.box}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to FixIT!
        </Typography>
        {/* Render the form component */}
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
