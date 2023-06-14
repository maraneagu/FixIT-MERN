import { Box } from "@mui/material";
import { styled } from "@mui/system";

// Define a styled component called FlexBetween
const FlexBetween = styled(Box)({
  display: "flex", // Set the display property to "flex"
  justifyContent: "space-between", // Align items along the horizontal axis with space between them
  alignItems: "center", // Align items along the vertical axis at the center
});

export default FlexBetween;
