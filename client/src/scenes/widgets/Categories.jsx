import { useMediaQuery, Box } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import Category from "components/Category";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "state";

const Categories = () => {
  // Check if the screen is a non-mobile screen using MUI's useMediaQuery hook
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null); // Track the currently selected category

  const handleCategorySelect = (category) => {
    dispatch(setCategory({ category: category })); // Dispatch an action to update the selected category in Redux store
    setSelectedCategory(category); // Update the selected category state
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
        <Category icon="car-icon.png" size="70%" text="Auto" isSelected={selectedCategory === "auto"} />
      </Box>

      <Box onClick={() => handleCategorySelect("tailoring")}>
        <Category icon="needle-icon.png" size="50%" text="Tailoring" isSelected={selectedCategory === "tailoring"}  />
     </Box>

     <Box onClick={() => handleCategorySelect("furniture")}>
        <Category icon="furniture-icon.png" size="70%" text="Furniture" isSelected={selectedCategory === "furniture"}  />
     </Box>

     <Box onClick={() => handleCategorySelect("electronics")}>
        <Category icon="electronics-icon.png" size="56%" text="Electronics" isSelected={selectedCategory === "electronics"}  />
    </Box>

    <Box onClick={() => handleCategorySelect("installation")}>
        <Category icon="sink-icon.png" size="60%" text="Installation" isSelected={selectedCategory === "installation" }  />
    </Box>
    </WidgetWrapper> 
    </>
  );
};

export default Categories;
