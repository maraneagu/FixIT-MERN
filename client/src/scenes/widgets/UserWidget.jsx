import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  
} from "@mui/icons-material";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
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
import {IconButton} from "@mui/material";
import { useDispatch} from "react-redux";
import { setFriends } from "state";
import Friend from "components/Friend";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  
  const { palette } = useTheme();
  
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  var hasBio = false;
  const loggedInUserId = useSelector((state) => state.user._id);
  
  const isProfileUser = userId === loggedInUserId;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
   
  useEffect(() => {
    getUser();
    
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
 
  if (!user) {
    return null;
  }

  const { firstName, lastName, location, isClient, friends,followers, bio } = user;
  if (bio !== "") hasBio = true;

  if (isClient === true) {
    return (
      <WidgetWrapper>
        {/* FIRST ROW */}
        
        {isProfileUser ? (
        // FIRST ROW for profile user
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

        {/* THIRD ROW */}
        {/*
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Who's viewed your profile</Typography>
            <Typography color={main} fontWeight="500">
              {viewedProfile}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>Impressions of your post</Typography>
            <Typography color={main} fontWeight="500">
              {impressions}
            </Typography>
          </FlexBetween>
        </Box>
  
        <Divider />
  */}
      </WidgetWrapper>
    );
  } else {
    return (
      <WidgetWrapper>
        {/* FIRST ROW */}
        {isProfileUser ? (
        // FIRST ROW for profile user
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

        {/* THIRD ROW */}
        {/*
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Who's viewed your profile</Typography>
            <Typography color={main} fontWeight="500">
              {viewedProfile}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>Impressions of your post</Typography>
            <Typography color={main} fontWeight="500">
              {impressions}
            </Typography>
          </FlexBetween>
        </Box>
  
        <Divider />
  */}
        {/* FOURTH ROW 
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>
  
          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img src="../assets/twitter.png" alt="twitter" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Twitter
                </Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
  
          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <img src="../assets/linkedin.png" alt="linkedin" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Linkedin
                </Typography>
                <Typography color={medium}>Network Platform</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
        </Box>*/}
      </WidgetWrapper>
    );
  }
};
export default UserWidget;
