import { Box, useMediaQuery, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { setTips } from "state";
import { useParams } from "react-router-dom";
import Navbar from "components/navbar";
import FriendListWidgetProfile from "scenes/widgets/friendListWidgets/FriendListWidgetProfile";
import PostsWidget from "scenes/widgets/postWidgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import TipsWidget from "scenes/widgets/tipWidgets/TipsWidget";

const ProfilePage = () => {
  // State to store the user data
  const [user, setUser] = useState(null);

  // Get the userId from the URL parameters
  const { userId } = useParams();

  // Get the token from the Redux store
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  // Utility hooks
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // Check if the screen width is larger than 1000px
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // Get the logged-in user's ID from the Redux store
  const loggedInUserId = useSelector((state) => state.user._id);

  // Check if the profile page belongs to the logged-in user
  const isProfileUser = userId === loggedInUserId;

  const [posts, setPostsState] = useState([]);
  const hasPosts = posts.length > 0;
  console.log(posts);

  const [tips, setTipsState] = useState([]);
  const hasTips = tips.length > 0;
  console.log(tips);

  // Function to fetch user data from the server
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

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
      const reversedData = data.reverse(); // Sort the data in reverse order
      dispatch(setPosts({ posts: reversedData }));
      setPostsState(reversedData);
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
    }
  };

  const getUserTips = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/tips/${userId}/tips`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      console.log(data);
      const reversedData = data.reverse(); // Sort the data in reverse order
      dispatch(setTips({ tips: reversedData }));
      setTipsState(reversedData);
    } catch (error) {
      console.error("Failed to fetch user tips:", error);
    }
  };

  useEffect(() => {
    // Fetch the user data when the component mounts
    getUser();
    getUserPosts();
    getUserTips();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Render nothing if the user data is not available yet
  if (!user) return null;

  return (
    <Box>
      {/* Render the navbar component */}
      <Navbar />

      {hasPosts ? (
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="5rem"
          justifyContent="center"
        >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            {/* Render the user widget component */}
            <UserWidget userId={userId} picturePath={user.picturePath} />
              
            <Box m="2rem 0" />
            {/* Render the friend list widget component */}
            <FriendListWidgetProfile userId={userId} />

            {hasTips && (
              <Box widht="100%">
                <Typography color={main} variant="h5" align="center" style={{ marginTop: "3rem", marginBottom: "3rem", fontSize: "1.2rem", fontWeight: "bold" }}>
                  Recommendations
                </Typography>
                <TipsWidget userId={userId} isProfile />
              </Box>
            )}
          </Box>

          {isProfileUser ? (
            <Box
              width={isNonMobileScreens ? "38%" : undefined}
              mt={isNonMobileScreens ? "-30px" : "1.5rem"}
              ml={isNonMobileScreens ? "30px" : undefined}
            >
              <Box m="2rem 0" />
              <Box width="100%">
                <PostsWidget userId={userId} isProfile />
              </Box>
            </Box>
          ) : (
            <Box
              width={isNonMobileScreens ? "38%" : undefined}
              mt={isNonMobileScreens ? "-30px" : "1.5rem"}
              ml={isNonMobileScreens ? "30px" : undefined}
            >
              <Box m="2rem 0" />
              <Box width="100%">
                <PostsWidget userId={userId} isProfile />
              </Box>
            </Box>
          )}
        </Box>
      ) : hasTips ? (
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap={hasPosts ? "5rem" : "0"}
          justifyContent="center"
          alignItems="center"
        >
          <Box flexBasis={isNonMobileScreens ? "50%" : undefined}>
            {/* Render the user widget component */}
            <UserWidget userId={userId} picturePath={user.picturePath} />

            <Box m="2rem 0" />
            {/* Render the friend list widget component */}
            <FriendListWidgetProfile userId={userId} />

            <Typography color={main} variant="h5" align="center" style={{ marginTop: "3rem", marginBottom: "3rem", fontSize: "1.2rem", fontWeight: "bold" }}>
              Recommendations
            </Typography>

            {isProfileUser ? (
            <Box
              width={isNonMobileScreens ? "100%" : undefined}
              mt={isNonMobileScreens ? "1rem" : "1.5rem"}
            >
                <TipsWidget userId={userId} isProfile />
            </Box>
          ) : (
            <Box
              width={isNonMobileScreens ? "100%" : undefined}
              mt={isNonMobileScreens ? "-30px" : "1.5rem"}
            >
                <TipsWidget userId={userId} isProfile />
            </Box>
          )}
          </Box>
        </Box>
      ) : (
          <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap={hasPosts ? "5rem" : "0"}
            justifyContent="center"
            alignItems="center"
          >
              <Box flexBasis={isNonMobileScreens ? "50%" : undefined}>
                {/* Render the user widget component */}
                <UserWidget userId={userId} picturePath={user.picturePath} />

                <Box m="2rem 0" />
                {/* Render the friend list widget component */}

                <FriendListWidgetProfile userId={userId} />
              </Box>
          </Box>
      )}
    </Box>
  );
};

export default ProfilePage;
