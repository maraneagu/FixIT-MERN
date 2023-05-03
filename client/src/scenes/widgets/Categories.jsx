import { Box, useMediaQuery } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import Category from "components/Category";

const Categories = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <WidgetWrapper 
        display="flex"
        ml={isNonMobileScreens ? "15px" : undefined} 
        mr={isNonMobileScreens ? "15px" : undefined} 
        justifyContent="center"
    >
        <Category icon="car-icon.png" size="70%" text="Auto"/>
        <Category icon="needle-icon.png" size="50%" text="Tailoring"/>
        <Category icon="furniture-icon.png" size="70%" text="Furniture"/>
        <Category icon="electronics-icon.png" size="56%" text="Electronics"/>
        <Category icon="sink-icon.png" size="60%" text="Installation"/>
    </WidgetWrapper>
  );
};

export default Categories;
