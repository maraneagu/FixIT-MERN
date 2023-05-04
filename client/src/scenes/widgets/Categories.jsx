import { Box, useMediaQuery } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import Category from "components/Category";
import { useNavigate } from "react-router-dom";
import PostsWidget from "./PostsWidget";
import { useState } from "react";

const Categories = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    //console.log()
  };


  return (
    <>
    <WidgetWrapper 
        display="flex"
        ml={isNonMobileScreens ? "15px" : undefined} 
        mr={isNonMobileScreens ? "15px" : undefined} 
        justifyContent="center"
    >
      <Box onClick={() => {handleCategorySelect("auto");}}>
        <Category icon="car-icon.png" size="70%" text="Auto" />
      </Box>

      <Box onClick={() => handleCategorySelect("tailoring")}>
        <Category icon="needle-icon.png" size="50%" text="Tailoring"  />
     </Box>

     <Box onClick={() => handleCategorySelect("furniture")}>
        <Category icon="furniture-icon.png" size="70%" text="Furniture"  />
     </Box>

     <Box onClick={() => handleCategorySelect("electronics")}>
        <Category icon="electronics-icon.png" size="56%" text="Electronics"  />
    </Box>

    <Box onClick={() => handleCategorySelect("installation")}>
        <Category icon="sink-icon.png" size="60%" text="Installation"  />
    </Box>
      
    </WidgetWrapper>
    

    { selectedCategory && 
      <PostsWidget selectedCategory={selectedCategory} />}
    </>
    
  );
};

export default Categories;
