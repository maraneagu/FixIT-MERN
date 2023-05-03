import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ClassIcon from '@mui/icons-material/Class';
import { Box, useMediaQuery, Typography, useTheme, Divider, IconButton} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import WidgetWrapper from "components/WidgetWrapper";
import Friend from "components/Friend";
import EditNavbar from "scenes/edit/editNavbar";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { setPost } from "state";

const ShowPost = () => {
  const { postId } = useParams();

  const loggedInUserId = useSelector((state) => state.user._id);

  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const [isComments, setIsComments] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const primary = palette.primary.main;

  const currentPost = useSelector((state) =>
    state.posts.find((post) => post._id === postId)
  );

  const isLiked = Boolean(currentPost.likes[loggedInUserId]);
  const likeCount = Object.keys(currentPost.likes).length;
  const isProfileUser = currentPost.userId === loggedInUserId;

  const dispatch = useDispatch();

  const getPost = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPost(data));
  };

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

  useEffect(() => {
    // fetch post whenever postId changes
    if (!currentPost) {
      getPost();
    }
    console.log(currentPost.firstName);
  }, [postId]);

  if (!currentPost) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <EditNavbar />
      <Box
        width="100%"
        padding="1rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="1rem"
        justifyContent="center"
      >
        <WidgetWrapper m="2rem 0" marginLeft="15px" marginRight="15px" width={isNonMobileScreens ? "60%" : undefined}>
          <Friend
            friendId={currentPost.userId}
            name={`${currentPost.firstName} ${currentPost.lastName}`}
            subtitle={currentPost.location}
            userPicturePath={currentPost.userPicturePath}
          />

          <Typography
            color={medium}
            display="flex"
            alignItems="center"
            sx={{ mt: "1.3rem", mb: "5px" }}
          >
            <ClassIcon sx={{ color: main, mr: "8px" }}/>
            {currentPost.category ? currentPost.category.charAt(0).toUpperCase() + currentPost.category.slice(1) : ''}
          </Typography>

          <Typography 
            color={main} 
            variant="h5" 
            fontWeight="500"  
            sx={{ mt: "1rem", width: "100%", wordWrap: "break-word" }}
          >
            {currentPost.title}
          </Typography>

          <Typography color={main} marginBottom="5px" sx={{ mt: "1rem", width: "100%", wordWrap: "break-word" }}>
            {currentPost.description}
          </Typography>
          
          {currentPost.picturePath && (
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              src={`http://localhost:3001/assets/${currentPost.picturePath}`}
            />
          )}
  
          <FlexBetween mt="0.25rem" mb="0.25rem">
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
                <Typography>{currentPost.comments.length}</Typography>
              </FlexBetween>
            </FlexBetween>

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
          </FlexBetween>

          {isComments && (
            <Box mt="0.5rem">
              {currentPost.comments.map((comment, i) => (
                <Box key={`${currentPost.name}-${i}`}>
                  <Divider />
                  <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                    {comment}
                  </Typography>
                </Box>
              ))}
              <Divider />
            </Box>
          )}
        </WidgetWrapper>
      </Box>
    </Box>
  );
};

export default ShowPost;
