import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ClassIcon from '@mui/icons-material/Class';
import { 
  Box, useMediaQuery, Typography, useTheme, Divider, IconButton, Dialog,
  DialogTitle,
  Button,
  DialogContent,
  DialogActions,
  Rating,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation  } from "react-router-dom";
import WidgetWrapper from "components/WidgetWrapper";
import Friend from "components/Friend";
import Navbar from "components/navbar";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { setPost } from "state";
import ReviewsWidget from "scenes/widgets/reviewWidgets/ReviewsWidget";

const ShowPost = () => {
  const { postId } = useParams();

  const loggedInUserId = useSelector((state) => state.user._id);

  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewDescription, setReviewDescription] = useState("");

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const location = useLocation();

  const currentPost = useSelector((state) =>
    state.posts.find((post) => post._id === postId)
  );

  const likeCount = Object.keys(currentPost.likes).length;
  const isLiked = Boolean(currentPost.likes[loggedInUserId]);
  const isProfileUser = currentPost.userId === loggedInUserId;

  const dispatch = useDispatch();

  const getPost = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPost(data));
  };

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleReviewDialogOpen = () => {
    setIsReviewDialogOpen(true);
  };

  const handleReviewDialogClose = () => {
    setIsReviewDialogOpen(false);
    setReviewRating(0);
    setReviewDescription("");
  };

  const handleReviewRatingChange = (value) => {
    setReviewRating(value);
  };

  const handleReviewDescriptionChange = (event) => {
    setReviewDescription(event.target.value);
  };

  const handleAddReview = async () => {
    if (reviewRating === 0 || reviewDescription === "") {
      return;
    }

    const response = await fetch(`http://localhost:3001/reviews/${loggedInUserId}/${postId}/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stars: reviewRating,
        description: reviewDescription,
      }),
    });

    if (response.ok) {
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setIsReviewDialogOpen(false);
      setReviewRating(0);
      setReviewDescription("");
      window.location.reload();
    }
  };

  useEffect(() => {
    // fetch post whenever postId changes
    if (!currentPost){
      getPost();
    }
    console.log(currentPost.firstName);
  }, [postId, location]);

  if (!currentPost) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Navbar />
      <Box
        display="flex"
        flexDirection={isNonMobileScreens ? "row" : "column"}
        justifyContent={isNonMobileScreens ? "space-between" : "center"}
        alignItems={isNonMobileScreens ? "flex-start" : "center"}
        padding="2rem 6%"
        gap="2rem"
      >
        <Box width={isNonMobileScreens ? "60%" : "100%"}>
          <WidgetWrapper m="2rem 0" marginLeft={isNonMobileScreens ? "15px" : undefined} marginRight={isNonMobileScreens ? "15px" : undefined}>
            <Friend
              friendId={currentPost.userId}
              name={`${currentPost.firstName} ${currentPost.lastName}`}
              subtitle={currentPost.location}
              userPicturePath={currentPost.userPicturePath}
            />

            <Typography
              color={medium}
              display="flex"
              alignItems="center"
              sx={{ mt: "1.3rem", mb: "5px" }}
            >
              <ClassIcon sx={{ color: main, mr: "8px" }}/>
              {currentPost.category ? currentPost.category.charAt(0).toUpperCase() + currentPost.category.slice(1) : ''}
            </Typography>

            <Typography 
              color={main} 
              variant="h5" 
              fontWeight="500"  
              sx={{ mt: "1.5rem", mb: "0.80rem", width: "100%", wordWrap: "break-word" }}
            >
              {currentPost.title}
            </Typography>
            
            {currentPost.picturePath && (
              <img
                width="100%"
                height="auto"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem", marginBottom: "0.5rem" }}
                src={`http://localhost:3001/assets/${currentPost.picturePath}`}
              />
            )}

            <Typography color={main} marginBottom="5px" sx={{ mt: "1rem", width: "100%", wordWrap: "break-word" }}>
              {currentPost.description}
            </Typography>

            <Divider sx={{ mt: "1.2rem", mb: "1rem" }} />

            <FlexBetween mt="0.25rem" mb="0.25rem">
              <FlexBetween gap="1rem">
                <FlexBetween gap="0.3rem">
                  <IconButton onClick={patchLike} sx={{ color: main }}>
                    {isLiked ? (
                      <FavoriteOutlined sx={{ color: main }} />
                    ) : (
                      <FavoriteBorderOutlined />
                    )}
                  </IconButton>
                  <Typography>{likeCount}</Typography>
                </FlexBetween>

                <FlexBetween gap="0.3rem">
                  <IconButton onClick={handleReviewDialogOpen} sx={{ color: main }}>
                    <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <Typography 
                    onClick={handleReviewDialogOpen}
                    sx={{
                      color: main,
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    Add Review
                  </Typography>
                </FlexBetween>
              </FlexBetween>

              {isProfileUser && (
                <IconButton
                  onClick={() => navigate(`/editpost/${postId}`)}
                  sx={{
                    color: main,
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <EditIcon/>
                </IconButton>
              )}
            </FlexBetween>
          </WidgetWrapper>
        </Box>
      
        <Box width={isNonMobileScreens ? "40%" : "100%"}>
          <ReviewsWidget postId={postId} />
        </Box>
      </Box>

      <Dialog
        open={isReviewDialogOpen}
        onClose={handleReviewDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Review</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <Rating
              name="review-rating"
              value={reviewRating}
              onChange={(event, newValue) => {
                handleReviewRatingChange(newValue);
              }}
            />
          </Box>
          <TextField
            autoFocus
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            placeholder="Write your review..."
            value={reviewDescription}
            onChange={handleReviewDescriptionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReviewDialogClose}>Cancel</Button>
          <Button onClick={handleAddReview} variant="contained">
            Add Review
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShowPost;
