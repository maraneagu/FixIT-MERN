import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";

const Category = ({ icon, size, text }) => {
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const circleSize = "75px";

    return (
        <Box textAlign="center">
          <Box
            backgroundColor="#2671ab"
            display="inline-flex"
            width={circleSize}
            height={circleSize}
            justifyContent="center"
            alignItems="center"
            style={{ objectFit: "cover", borderRadius: "50%" }}
            marginLeft="13px"
            marginRight="13px"
          >
            <img
              width={size}
              height={size}
              alt="category"
              src={`http://localhost:3001/assets/${icon}`}
            />
          </Box>
          <Typography marginTop="10px" marginBottom="10px" color={main} fontWeight="500">
            {text}
          </Typography>
        </Box>
      );      
};

export default Category;
