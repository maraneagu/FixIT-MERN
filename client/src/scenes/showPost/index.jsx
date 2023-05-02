import { Box, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PostWidget from "scenes/widgets/PostWidget";

import Navbar from "scenes/navbar";
import { setPost } from "state";

const ShowPost = () => {
  const { postId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const currentPost = useSelector((state) =>
    state.posts.find((post) => post._id === postId)
  );

  const dispatch = useDispatch();

  const getPost = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPost(data));
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
      <Navbar />
      <Box
        width="50%"
        margin="0 auto" // add this line to center the Box horizontally
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <PostWidget
          key={postId}
          postId={postId}
          postUserId={currentPost.userId}
          name={`${currentPost.firstName} ${currentPost.lastName}`}
          description={currentPost.description}
          location={currentPost.location}
          picturePath={currentPost.picturePath}
          userPicturePath={currentPost.userPicturePath}
          likes={currentPost.likes}
          comments={currentPost.comments}
        />
      </Box>
    </Box>
  );
};

export default ShowPost;
