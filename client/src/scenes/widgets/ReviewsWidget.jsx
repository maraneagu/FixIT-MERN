import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReviews } from "state";
import ReviewWidget from "./ReviewWidget";
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
  TextField
} from "@mui/material";

const ReviewsWidget = ({ postId }) => {
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.reviews);
  const [reviews, setReviewsState] = useState(allReviews);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  
  
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const getPostReviews = async () => {
    const response = await fetch(
      `http://localhost:3001/reviews/${postId}/postReviews`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("aaiaiiaiaiai");
    const data = await response.json();
    dispatch(setReviews({ reviews: data }));
    setReviewsState(data);
  };

  useEffect(() => {
    getPostReviews();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
       // Adjust the height as per your requirements
    >
      <Typography 
        align="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingTop="30px"
        fontSize="20px"
        variant="h4"
        color={dark}
        fontWeight="500">
        Reviews
      </Typography>

      {Array.isArray(reviews) &&
        reviews.map(({ _id, postId, userId, description, stars }) => (
          <ReviewWidget
            key={_id}
            reviewId={_id}
            postId={postId}
            userId={userId}
            description={description}
            stars={stars}
          />
        ))}
    </Box>
  );
};

export default ReviewsWidget;
