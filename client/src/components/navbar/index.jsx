import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  // Get the user data from the Redux store
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // Get the MUI theme and define some color variables
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // Extract the user's full name and ID from the user object
  const fullName = `${user.firstName} ${user.lastName}`;
  const userId = user._id;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>

      {/* Desktop Logo */}
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          FixIT
        </Typography>
      </FlexBetween>

      {/* Desktop Navigation */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">

          {/* Dark/Light mode toggle */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>

          {/* Create post button */}
          {user.isClient === false && (
            <AddCircleIcon
              onClick={() => navigate(`/createpost/${userId}`)}
              sx={{
                fontSize: "25px",
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
            />
          )}
          <IconButton
          onClick={() => navigate("/tips")}
          >
            <Help sx={{ fontSize: "25px" }} />
          </IconButton>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              {/* User profile link */}
              <MenuItem 
                onClick={() => {
                  navigate(`/profile/${userId}`);
                  navigate(0);
                }}
                value={fullName}
              >
                <Typography>{fullName}</Typography>
              </MenuItem>

              {/* Logout option */}
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        
        // Mobile Menu Toggle Button
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* Mobile Navigation */}
      {/* Display mobile menu if on a non-mobile screen */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* Close icon */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Mobile menu items */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            {/* Dark/Light mode toggle */}
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>

            {/* Create post button */}
            <Message sx={{ fontSize: "25px" }} />

            {/* Notifications button */}
            <Notifications sx={{ fontSize: "25px" }} />

            {/* Help button */}
            <Help sx={{ fontSize: "25px" }} />

            {/* User profile dropdown */}
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                {/* User profile link */}
                <MenuItem 
                  onClick={() => {
                    navigate(`/profile/${userId}`);
                    navigate(0);
                  }} 
                  value={fullName}
                >
                  <Typography>{fullName}</Typography>
                </MenuItem>

                {/* Logout option */}
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
