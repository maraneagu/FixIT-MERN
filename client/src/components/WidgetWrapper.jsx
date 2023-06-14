import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem", // Padding values for the widget wrapper
  backgroundColor: theme.palette.background.alt, // Background color of the widget wrapper based on theme
  borderRadius: "0.75rem", // Border radius of the widget wrapper
}));

export default WidgetWrapper;
