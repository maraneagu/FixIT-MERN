import { useState } from "react";
import { useMediaQuery, useTheme,  InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";

const SearchBarPosts = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();

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
