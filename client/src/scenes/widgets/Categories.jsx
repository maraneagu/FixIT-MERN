import { Box, useMediaQuery, useTheme } from "@mui/material";
import Category from "components/Category";

const Categories = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const { palette } = useTheme();
  const bColor = palette.background.alt;

  return (
    <Box
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
        display="flex"
        p="2rem"
        marginLeft="15px"
        marginRight="15px"
        borderRadius="1.5rem"
        backgroundColor={bColor}
    >
        <Category icon="car-icon.png" size="60px" text="Auto"/>
        <Category icon="needle-icon.png" size="40px" text="Tailoring"/>
        <Category icon="furniture-icon.png" size="60px" text="Furniture"/>
        <Category icon="electronics-icon.png" size="46px" text="Electronics"/>
        <Category icon="sink-icon.png" size="50px" text="Installation"/>
    </Box>
  );
};

export default Categories;
