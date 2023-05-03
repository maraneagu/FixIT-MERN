import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditNavbar from "scenes/edit/editNavbar";
import FriendListWidgetProfile from "scenes/widgets/FriendListWidgetProfile";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const loggedInUserId = useSelector((state) => state.user._id);
  const isProfileUser = userId === loggedInUserId;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <EditNavbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidgetProfile userId={userId} />
        </Box>

        {isProfileUser ? (
          <Box
            maxWidth={isNonMobileScreens ? "46%" : undefined}
            mt={isNonMobileScreens ? "-30px" : "1.5rem"}
            ml={isNonMobileScreens ? "30px" : undefined}
          >
            <Box m="2rem 0" />
            <PostsWidget userId={userId} isProfile />
          </Box>
        ) : (
          <Box
            maxWidth={isNonMobileScreens ? "46%" : undefined}
            mt={isNonMobileScreens ? "-30px" : "2rem"}
            ml={isNonMobileScreens ? "30px" : undefined}
          >
            <PostsWidget userId={userId} isProfile />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
