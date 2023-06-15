import { LocationOnOutlined } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import EditIcon from "@mui/icons-material/Edit";
import BuildIcon from "@mui/icons-material/Build";
import Friend from "components/Friend";

const UserWidget = ({ userId, picturePath }) => {
  // State and selector hooks
  const [user, setUser] = useState(null);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isProfileUser = userId === loggedInUserId;

  // Theme customization
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // Navigation hook
  const navigate = useNavigate();

  // Token selector hook
  const token = useSelector((state) => state.token);

  // Flag for checking if user has a bio
  var hasBio = false;

  // Fetch user data from the server
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    // Call getUser() when the component mounts
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const { firstName, lastName, location, isClient, friends, followers, bio } = user;

  // Check if the user has a bio
  if (bio !== "") {
    hasBio = true;
  }

  if (isClient === true) {
    return (
      <WidgetWrapper>
        {/* FIRST ROW */}
        
        {isProfileUser ? (
        // Render the first row for the profile user
        <FlexBetween>
          <FlexBetween
            gap="0.5rem"
            pb="1.1rem"
            onClick={() => navigate(`/profile/${userId}`)}
          >
            <FlexBetween gap="1rem">
              <UserImage image={user.picturePath} />

              <Box>
                <Typography
                  variant="h4"
                  color={dark}
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: palette.primary.light,
                      cursor: "pointer",
                    },
                  }}
                >
                  {firstName} {lastName}
                </Typography>

                <Typography color={medium}>{friends.length} friends</Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>
          <EditIcon
              onClick={() => navigate(`/edit/${userId}`)}
              sx={{
                marginTop: "-33px",
                marginRight: "5px",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
          
        </FlexBetween>
        ):(
          // Render the Friend component for non-profile users
          <Friend
              key={userId}
              friendId={userId}
              name={`${firstName} ${lastName}`}
              subtitle={isClient}
              userPicturePath={picturePath}
              onClick={() => navigate("/home")}
          />
        )}
        {isProfileUser ?(<Divider />):
              (<Divider sx={{
                marginTop:"15px"
              }}/>)}
        

        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <PsychologyAltIcon fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>Client</Typography>
          </Box>
        </Box>

        <Divider />

        {hasBio ? (
          <Box display="flex" alignItems="center" gap="1rem" marginTop="10px" marginBottom="5px">
            <BuildIcon fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{bio}</Typography>
          </Box>
        ) : null}
      </WidgetWrapper>
    );
  } else {
    return (
      <WidgetWrapper>
        {/* FIRST ROW */}
        {isProfileUser ? (
        // Render the first row for the profile user
        <FlexBetween>
          <FlexBetween
            gap="0.5rem"
            pb="1.1rem"
            onClick={() => navigate(`/profile/${userId}`)}
          >
            <FlexBetween gap="1rem">
              <UserImage image={picturePath} />

              <Box>
                <Typography
                  variant="h4"
                  color={dark}
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: palette.primary.light,
                      cursor: "pointer",
                    },
                  }}
                >
                  {firstName} {lastName}
                </Typography>

                <Typography color={medium}>{friends.length} friends</Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>
          <EditIcon
            onClick={() => navigate(`/edit/${userId}`)}
            sx={{
              marginTop: "-33px",
              marginRight: "5px",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
          
        </FlexBetween>
        ):(
          // Render the Friend component for non-profile users
          <Friend
              key={userId}
              friendId={userId}
              name={`${firstName} ${lastName}`}
              subtitle={isClient}
              userPicturePath={picturePath}
              onClick={() => navigate("/home")}
          />
        )}

        {isProfileUser ?(<Divider />):
              (<Divider sx={{
                marginTop:"15px"
              }}/>)}

        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <EngineeringIcon fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>Master</Typography>
          </Box>
        </Box>

        <Divider />

        {hasBio ? (
          <Box display="flex" alignItems="center" gap="1rem" marginTop="10px" marginBottom="5px">
            <BuildIcon fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{bio}</Typography>
          </Box>
        ) : null}
      </WidgetWrapper>
    );
  }
};

export default UserWidget;
