import { useState } from "react";
import { useMediaQuery, useTheme, InputBase } from "@mui/material";
import { useDispatch } from "react-redux";
import { Search } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { setSearchQuery, setCategory } from "state";

const SearchBarPosts = ({ onSearch }) => {
  const [searchQuery, setSearchQueryState] = useState(""); // Track the current search query
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    const query = event.target.value;
    onSearch(query); // Invoke the provided onSearch callback with the new query
    setSearchQueryState(query); // Update the search query state
    dispatch(setSearchQuery({ searchQuery: query })); // Dispatch an action to update the search query in Redux store
  };

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)"); // Check if the screen is a non-mobile screen using MUI's useMediaQuery hook
  const { palette } = useTheme(); // Access the theme object

  return (
    <FlexBetween
      backgroundColor={palette.background.alt} // Set the background color based on the theme's alternative background color
      borderRadius="9px"
      gap="3rem"
      padding="1rem 1.5rem"
      mb="2rem"
      ml={isNonMobileScreens ? "15px" : undefined}
      mr={isNonMobileScreens ? "15px" : undefined}
    >
      <InputBase
        placeholder="Search..."
        value={searchQuery} // Set the input value to the current search query
        onChange={handleSearchChange} // Call handleSearchChange when the input value changes
      />
      <Search /> {/* Render the search icon */}
    </FlexBetween>
  );
};

export default SearchBarPosts;
