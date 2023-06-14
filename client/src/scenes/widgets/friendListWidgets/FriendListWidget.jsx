import { Box, Button, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import FriendOnPost from "components/FriendOnPost";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import { useNavigate } from "react-router-dom";

const FriendListWidget = ({ userId }) => {
  // Redux dispatch to update the friends list in the store
  const dispatch = useDispatch();

  // Access the color palette from the current theme
  const { palette } = useTheme();

  // Get the token from the Redux store
  const token = useSelector((state) => state.token);

  // Navigation object to programmatically navigate to different routes
  const navigate = useNavigate();

  // Get the friends list from the Redux store
  const friends = useSelector((state) => state.user.friends);

  // Get the logged-in user's ID from the Redux store
  const loggedInUserId = useSelector((state) => state.user._id);

  // Check if the current user is viewing their own profile
  const isProfileUser = userId === loggedInUserId;

  // State to toggle showing more friends (currently not used)
  const [showMore] = useState(false);

  // Function to fetch the friends list from the server
  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();

    // Update the friends list in the Redux store
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    // Fetch the friends list when the component mounts
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      {/* Render the "Following" title */}
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Following
      </Typography>

      {/* Render the friends */}
      <Box display="flex" flexDirection="column" gap="1.5rem" mb="0.5rem">
        {friends.slice(0, showMore ? friends.length : 3).map((friend) => (
          // Render Friend component for the profile user, or FriendOnPost component for others
          isProfileUser ? (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.isClient}
              userPicturePath={friend.picturePath}
            />
          ) : (
            <FriendOnPost
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.isClient}
              userPicturePath={friend.picturePath}
            />
          )
        ))}
      </Box>

      {/* Render the "Show More" button if there are more than 3 friends */}
      {friends.length > 3 && (
        <Box mt="1.5rem" display="flex" justifyContent="center">
          <Button
            onClick={() => navigate(`/showMoreFriends/${userId}`)}
            sx={{
              m: "0.5rem 0",
              p: "0.5rem",
              backgroundColor: palette.background.alt,
              color: palette.login.button,
              "&:hover": {
                backgroundColor: palette.login.buttonHover,
                color: palette.login.buttonTextHover,
              },
            }}
          >
            Show More
          </Button>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default FriendListWidget;
