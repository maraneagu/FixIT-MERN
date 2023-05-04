import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const Category = ({ icon, size, text }) => {
    const { palette } = useTheme();
    const main = palette.neutral.main;

    return (
        <Box
            textAlign="center"
        >
            <Box 
                width="75px" 
                height="75px"
                backgroundColor="#2671ab"
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ objectFit: "cover", borderRadius: "50%" }}
                marginLeft="13px"
                marginRight="13px"
                sx={{
                    "&:hover": {
                      color: palette.primary.light,
                      cursor: "pointer",
                    },
                  }}

            >
                <img
                    width={size}
                    height={size}
                    alt="category"
                    src={`http://localhost:3001/assets/${icon}`}
                />
            </Box>
            <Typography
                marginTop="10px"
                marginBottom="10px"
                color={main}
                fontWeight="500"
            > 
                {text} 
            </Typography>
        </Box>
    );
};

export default Category;
