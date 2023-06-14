import { Box, Button, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import FriendOnPost from "components/FriendOnPost";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import { useNavigate } from "react-router-dom";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const friends = useSelector((state) => state.user.friends);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isProfileUser = userId === loggedInUserId;
  const [showMore, setShowMore] = useState(false);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Following
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem" mb="0.5rem">

      {friends.slice(0, showMore ? friends.length : 3).map((friend)  => (
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

      {friends.length > 3 && ( // only show button if there are more than 3 friends
        <Box 
          mt="1.5rem"
          display="flex" justifyContent="center"
        >
          <Button
            onClick={() => navigate(`/showMoreFriends/${userId}`)}
            sx={{
              m: "0.5rem 0",
              p: "0.5rem",
              backgroundColor: palette.background.alt,
              color: palette.login.button,
              "&:hover": { backgroundColor: palette.login.buttonHover,
                           color: palette.login.buttonTextHover },
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