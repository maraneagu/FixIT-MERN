import { useState } from "react";
import { Box, TextField } from "@mui/material";

const SearchBarPosts = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <Box mb={2}>
      <TextField
        label="Search posts"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </Box>
  );
};

export default SearchBarPosts;
