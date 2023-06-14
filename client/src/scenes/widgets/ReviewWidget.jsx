import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ClassIcon from "@mui/icons-material/Class";
import TitleIcon from "@mui/icons-material/Title";
import { useEffect } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
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
  Rating,
  TextField,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReviews } from "state";
import { useNavigate, useLocation } from "react-router-dom";
import FriendOnPost from "components/FriendOnPost";

const ReviewWidget = ({
  key,
  reviewId,
  postId,
  userId,
  description,
  stars,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isProfileUser = userId === loggedInUserId;
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const navigate = useNavigate();
  const { palette } = useTheme();
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const location = user?.location || "";
  const picturePath = user?.picturePath || "";
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const primary = palette.primary.main;
  const location2 = useLocation();
  const isHomePage = location2.pathname === "/home";
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const handleDeleteConfirmationOpen = () => {
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
  };

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

      const restReviews = await response.json();
      dispatch(setReviews( restReviews ));
      window.location.reload();
    }
  };

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

  useEffect(() => {
    getUser();
  }, [userId, token]);

  return (
    <Box>
      <WidgetWrapper m="2rem 0" ml={isNonMobileScreens ? "15px" : undefined} mr={isNonMobileScreens ? "15px" : undefined}>
      <FlexBetween>
        <FriendOnPost
          friendId={userId}
          name={`${firstName} ${lastName}`}
          subtitle={location}
          userPicturePath={picturePath}
        />
        <Rating
          value={stars}
          readOnly
          max={5}
          emptyIcon={<StarBorderIcon />}
          icon={<StarIcon />}
        />
      </FlexBetween>

      <FlexBetween mt="1rem" sx={{ lineHeight: "1.5", wordWrap: "break-word" }}>
        <Typography color={main} marginBottom="5px" sx={{ mt: "1rem", mb: "1rem", width: "100%", wordWrap: "break-word" }}>
            {description}
        </Typography> 
      </FlexBetween>

      <Box ml={isNonMobileScreens ? "94%" : "95.5%"}>
        {isProfileUser && (
          <IconButton onClick={handleDeleteConfirmationOpen} sx = {{color: main}}>
            <DeleteOutlined />
          </IconButton>
        )}
      </Box>

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
