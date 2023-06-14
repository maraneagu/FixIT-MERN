import { useState } from "react";
import { useMediaQuery, useTheme, InputBase } from "@mui/material";
import { useDispatch } from "react-redux";
import { Search } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { setSearchQuery, setCategory } from "state";

const SearchBarPosts = ({ onSearch }) => {
  const [searchQuery, setSearchQueryState] = useState("");
  const dispatch = useDispatch();
  const handleSearchChange = (event) => {
    const query = event.target.value;
    onSearch(query);
    setSearchQueryState(query);
    dispatch(setSearchQuery({ searchQuery: query }));
  };
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    dispatch(setCategory({ category }));
  };

  return (
    <FlexBetween
      backgroundColor={palette.background.alt}
      borderRadius="9px"
      gap="3rem"
      padding="1rem 1.5rem"
      mb="2rem"
      ml={isNonMobileScreens ? "15px" : undefined} 
      mr={isNonMobileScreens ? "15px" : undefined} 
    >
      <InputBase 
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange} 
      />
      <Search/>
    </FlexBetween>
  );
};

export default SearchBarPosts;