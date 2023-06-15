import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReviews } from "state";
import ReviewWidget from "./ReviewWidget";
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";

const ReviewsWidget = ({ postId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const allReviews = useSelector((state) => state.reviews);
  const [reviews, setReviewsState] = useState(allReviews);

  const { palette } = useTheme();
  const dark = palette.neutral.dark;

  // Fetch the reviews for the specific post from the server
  const getPostReviews = async () => {
    const response = await fetch(
      `http://localhost:3001/reviews/${postId}/postReviews`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    const reversedData = data.reverse(); // Sort the data in reverse order
    dispatch(setReviews({ reviews: reversedData }));
    setReviewsState(reversedData);
  };

  useEffect(() => {
    // Fetch the post reviews when the component mounts
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
        fontWeight="500"
      >
        Reviews
      </Typography>

      {/* Render each review using the ReviewWidget component */}
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
