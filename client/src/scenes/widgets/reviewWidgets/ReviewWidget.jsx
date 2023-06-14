import {
  DeleteOutlined,
} from "@mui/icons-material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReviews } from "state";
import { useNavigate, useLocation } from "react-router-dom";
import FriendOnPost from "components/FriendOnPost";

const ReviewWidget = ({
  reviewId,
  postId,
  userId,
  description,
  stars,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  // Get the theme from MUI's useTheme hook
  const { palette } = useTheme();
  const main = palette.neutral.main;

  // Local state and variable declarations
  const [user, setUser] = useState(null);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isProfileUser = userId === loggedInUserId;

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const location = user?.location || "";
  const picturePath = user?.picturePath || "";

  // Get the current location and check if it's a non-mobile screen using MUI's useMediaQuery hook
  const location2 = useLocation();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // Event handler for opening the delete confirmation dialog
  const handleDeleteConfirmationOpen = () => {
    setDeleteConfirmationOpen(true);
  };

  // Event handler for closing the delete confirmation dialog
  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
  };

  // Delete the review
  const deleteReview = async () => {
    const response = await fetch(`http://localhost:3001/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: postId }),
    });
    if (response.ok) {
      handleDeleteConfirmationClose();

      // Update the Redux store with the remaining reviews
      const restReviews = await response.json();
      dispatch(setReviews(restReviews));
      
      // Reload the page
      window.location.reload();
    }
  };

  // Fetch the user data associated with the review
  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        setUser(data);
      } else {
        throw new Error("Error fetching user data");
      }
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  // Fetch the user data when the component mounts or when userId or token changes
  useEffect(() => {
    getUser();
  }, [userId, token]);

  return (
    <Box>
      <WidgetWrapper m="2rem 0" ml={isNonMobileScreens ? "15px" : undefined} mr={isNonMobileScreens ? "15px" : undefined}>
        <FlexBetween>
          {/* Render the friend information */}
          <FriendOnPost
            friendId={userId}
            name={`${firstName} ${lastName}`}
            subtitle={location}
            userPicturePath={picturePath}
          />
          {/* Render the star rating */}
          <Rating
            value={stars}
            readOnly
            max={5}
            emptyIcon={<StarBorderIcon />}
            icon={<StarIcon />}
          />
        </FlexBetween>

        <FlexBetween mt="1rem" sx={{ lineHeight: "1.5", wordWrap: "break-word" }}>
          {/* Render the review description */}
          <Typography color={main} marginBottom="5px" sx={{ mt: "1rem", mb: "1rem", width: "100%", wordWrap: "break-word" }}>
            {description}
          </Typography>
        </FlexBetween>

        <Box ml={isNonMobileScreens ? "94%" : "95.5%"}>
          {/* Render the delete button for the review (only visible to the profile owner) */}
          {isProfileUser && (
            <IconButton onClick={handleDeleteConfirmationOpen} sx={{ color: main }}>
              <DeleteOutlined />
            </IconButton>
          )}
        </Box>

        {/* Render the delete confirmation dialog */}
        <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
          <DialogTitle>Delete Review</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to delete this review?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteConfirmationClose} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteReview} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </WidgetWrapper>
    </Box>
  );
};

export default ReviewWidget;
