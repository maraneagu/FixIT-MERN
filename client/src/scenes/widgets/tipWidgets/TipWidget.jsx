import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ClassIcon from '@mui/icons-material/Class';
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTip } from "state";
import { setTips } from "state";
import { useNavigate, useLocation } from "react-router-dom";
import PlayerComponent from "../PlayerComponent";

const TipWidget = ({
  tipId,
  tipUserId,
  name,
  title,
  description,
  category,
  location,
  videoPath,
  userPicturePath,
  likes,
}) => {
  // Import necessary icons, components, hooks, and actions
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook for dispatching actions to Redux store
  const token = useSelector((state) => state.token); // Access token from Redux store

  const loggedInUserId = useSelector((state) => state.user._id); // Get the logged-in user's ID
  const isProfileUser = tipUserId === loggedInUserId; // Check if the tip belongs to the logged-in user

  // Set up component state using useState hook
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const isLiked = Boolean(likes[loggedInUserId]); // Check if the logged-in user has liked the tip
  const likeCount = Object.keys(likes).length; // Get the total number of likes for the tip

  const { palette } = useTheme(); // Access the theme object
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const primary = palette.primary.main;

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)"); // Check if the screen size is larger than 1000px

  const patchLike = async () => {
    // Function to handle the like action
    const response = await fetch(`http://localhost:3001/tips/${tipId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedTip = await response.json();
    dispatch(setTip({ tip: updatedTip })); // Update the tip in the Redux store
  };

  const handleDeleteConfirmationOpen = () => {
    // Open the delete confirmation dialog
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    // Close the delete confirmation dialog
    setDeleteConfirmationOpen(false);
  };

  const deleteTip = async () => {
    // Function to delete the tip
    const response = await fetch(`http://localhost:3001/tips/${tipId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    if (response.ok) {
      const restTips = await response.json();
      dispatch(setTips({ tips: restTips })); // Update the tips in the Redux store
      // Reload the page
      window.location.reload();
    }
  };

  // Render the component's UI
  return (
    <WidgetWrapper
      m="2rem 0"
      ml={isNonMobileScreens ? "15px" : undefined}
      mr={isNonMobileScreens ? "15px" : undefined}
    >
      <Friend
        friendId={tipUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />

      <Typography
        color={main}
        variant="h5"
        fontWeight="500"
        sx={{ mt: "1rem", maxWidth: "100%", wordWrap: "break-word" }}
      >
        {title}
      </Typography>

      <Typography
        color={medium}
        display="flex"
        alignItems="center"
        sx={{ mt: "1.3rem", mb: "1.5rem" }}
      >
        <ClassIcon sx={{ color: main, mr: "8px" }} />
        {category ? category.charAt(0).toUpperCase() + category.slice(1) : ""}
      </Typography>

      <Typography
        color={main}
        marginBottom="5px"
        sx={{ mt: "1rem", mb: "1.5rem", maxWidth: "100%", wordWrap: "break-word" }}
      >
        {description}
      </Typography>

      <FlexBetween>
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
          <PlayerComponent vid={videoPath} />
        </div>
      </FlexBetween>

      <Divider sx={{ mt: "2rem", mb: "1rem" }} />

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
        </FlexBetween>
        <Box>
          {isProfileUser && (
            <IconButton
              onClick={() => navigate(`/edittip/${tipId}`)}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <EditIcon/>
            </IconButton>
          )}
          {isProfileUser && (
            <IconButton onClick={handleDeleteConfirmationOpen}>
              <DeleteOutlined />
            </IconButton>
          )}
        </Box>
      </FlexBetween>

      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle>Delete Tip</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this tip?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteTip} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </WidgetWrapper>
  );
};

export default TipWidget;
