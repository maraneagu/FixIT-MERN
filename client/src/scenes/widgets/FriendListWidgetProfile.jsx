import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import FriendOnPost from "components/FriendOnPost";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { setFriends } from "state";
import { useState } from "react";
const FriendListWidget = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const userfriends = useSelector((state) => state.user.friends);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isProfileUser = userId === loggedInUserId;

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setFriends(data);
  };

  useEffect(() => {
    getFriends();
  }, [userId]); // call getFriends whenever the userId prop changes

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
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) =>
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
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
