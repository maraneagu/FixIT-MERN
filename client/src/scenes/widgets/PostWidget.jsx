import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ClassIcon from '@mui/icons-material/Class';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { setPosts } from "state";
import { useNavigate, useLocation } from "react-router-dom";

const PostWidget = ({
  postId,
  postUserId,
  name,
  title,
  description,
  category,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const loggedInUserId = useSelector((state) => state.user._id);
  const isProfileUser = postUserId === loggedInUserId;

  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const navigate = useNavigate();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const primary = palette.primary.main;
  const location2 = useLocation();
  const isHomePage = location2.pathname === "/home";
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
  const deletePost = async () => {
    console.log("postid :", postId)
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    if (response.ok) {
      const restPosts = await response.json();
      dispatch(setPosts({ posts: restPosts}));
    }
  };
  return (
    <WidgetWrapper 
      m="2rem 0"
      ml={isNonMobileScreens ? "15px" : undefined} 
      mr={isNonMobileScreens ? "15px" : undefined} 
    >
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />

      <Typography 
          color={main} 
          variant="h5" 
          fontWeight="500" 
          sx={{ mt: "1rem", width: "100%", wordWrap: "break-word" }}
        >
          {title}
      </Typography>

      <Typography
        color={medium}
        display="flex"
        alignItems="center"
        sx={{ mt: "1.3rem", mb: "5px" }}
      >
        <ClassIcon sx={{ color: main, mr: "8px" }}/>
        {category ? category.charAt(0).toUpperCase() + category.slice(1) : ''}
      </Typography>
      
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
          
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
      <Box>
        {isProfileUser && (
          <IconButton
            onClick={() => navigate(`/editpost/${postId}`)}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <EditIcon/>
          </IconButton>
        )}
        {isProfileUser && (

          <IconButton onClick={deletePost}>
            <DeleteOutlined />
          </IconButton>
        )}</Box>
      </FlexBetween>
      
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}

      {/* Show the button only on the home page */}
      {isHomePage && (
        <Box
          marginTop="10px"
          marginBottom="10px"
          display="flex"
          justifyContent="center"
        >
          <Button
            variant="contained"
            onClick={() => navigate(`/show/${postId}`)}
          >
            See the offer
          </Button>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;