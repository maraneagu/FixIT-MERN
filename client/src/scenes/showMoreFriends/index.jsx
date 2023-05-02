import EditNavbar from "scenes/edit/editProfilePage/editNavbar";
import Friend from "components/Friend";
import FriendOnPost from "components/FriendOnPost";
import WidgetWrapper from "components/WidgetWrapper";
import { useParams } from "react-router-dom";
import {
  Box,
  useTheme,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setFriends } from "state";
import React from 'react';

const ShowMoreFriends = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const theme = useTheme();

  const loggedInUserId = useSelector((state) => state.user._id);
  const isProfileUser = userId === loggedInUserId;
  const friends = useSelector((state) => state.user.friends);
  //const [friends, setFriends] = useState([]);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

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
    getUser();
    getFriends();
  }, [userId]);

  if (!user) return null;

  return (
    <Box>
        <EditNavbar />

        <WidgetWrapper
            width="65%"
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.login.box}
        >
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
                textAlign="center"
            >
                Following
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">

            {friends.map((friend) => (
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
        </WidgetWrapper>
    </Box>
  );
};

export default ShowMoreFriends;