import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { useParams } from "react-router-dom";
import Navbar from "components/navbar";
import FriendListWidgetProfile from "scenes/widgets/friendListWidgets/FriendListWidgetProfile";
import PostsWidget from "scenes/widgets/postWidgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  // State to store the user data
  const [user, setUser] = useState(null);

  // Get the userId from the URL parameters
  const { userId } = useParams();

  // Get the token from the Redux store
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  // Check if the screen width is larger than 1000px
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // Get the logged-in user's ID from the Redux store
  const loggedInUserId = useSelector((state) => state.user._id);

  // Check if the profile page belongs to the logged-in user
  const isProfileUser = userId === loggedInUserId;

  const [posts, setPostsState] = useState([]);
  const hasPosts = posts.length > 0;

  // Function to fetch user-specific posts
  const getUserPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
      setPostsState(data);
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
    }
  };

  // Function to fetch user data from the server
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    // Fetch the user data when the component mounts
    getUser();
    getUserPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Render nothing if the user data is not available yet
  if (!user) return null;

  return (
    <Box>
      {/* Render the navbar component */}
      <Navbar />

      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        {/* Left section */}
        {hasPosts ? (
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            {/* Render the user widget component */}
            <UserWidget userId={userId} picturePath={user.picturePath} />
            <Box m="2rem 0" />
            {/* Render the friend list widget component */}
            <FriendListWidgetProfile userId={userId} />
          </Box>
        ) : (
          <Box flexBasis="60%">
            {/* Render the user widget component */}
            <UserWidget userId={userId} picturePath={user.picturePath} />
            <Box m="2rem 0" />
            {/* Render the friend list widget component */}
            <FriendListWidgetProfile userId={userId} />
          </Box>
        )}

        {/* Right section */}
        {isProfileUser ? (
          // Render posts widget with additional styles for the profile user
          <Box
            maxWidth={isNonMobileScreens ? "46%" : undefined}
            mt={isNonMobileScreens ? "-30px" : "1.5rem"}
            ml={isNonMobileScreens ? "30px" : undefined}
          >
            <Box m="2rem 0" />
            <PostsWidget userId={userId} isProfile />
          </Box>
        ) : (
          // Render posts widget for other users
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
