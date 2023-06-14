import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "components/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import PostsWidget from "scenes/widgets/postWidgets/PostsWidget";
import FriendListWidget from "scenes/widgets/friendListWidgets/FriendListWidget";
import Categories from "scenes/widgets/Categories";
import SearchBarPosts from "scenes/widgets/SearchBarPosts";

const HomePage = () => {
  // Checking if the screen size is greater than or equal to 1000px
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // Fetching the _id and picturePath of the user from the Redux store
  const { _id, picturePath } = useSelector((state) => state.user);

  // Setting up state for the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Handling the search query update
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Box>
      {/* Rendering the navbar component */}
      <Navbar />

      {/* The main content of the home page */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* UserWidget component displays user information */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        {/* Container for the search bar, categories, and posts */}
        <Box
          maxWidth={isNonMobileScreens ? "45%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* SearchBarPosts component allows users to search for posts */}
          <SearchBarPosts onSearch={handleSearch} />

          {/* Categories component displays post categories */}
          <Categories />

          {/* PostsWidget component displays posts */}
          <PostsWidget userId={_id} searchQuery={searchQuery} />
        </Box>

        {/* Displaying the friend list widget on non-mobile screens */}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Box m="0rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
