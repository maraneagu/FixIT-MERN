import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const FriendOnPost = ({ friendId, name, subtitle, userPicturePath }) => {
  const navigate = useNavigate();

  // Get the MUI theme and extract the palette object
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">

        {/* User image */}
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          {/* Friend name */}
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>

          {/* Friend subtitle */}
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
          
        </Box>
      </FlexBetween>
      
    </FlexBetween>
  );
};

export default FriendOnPost;
