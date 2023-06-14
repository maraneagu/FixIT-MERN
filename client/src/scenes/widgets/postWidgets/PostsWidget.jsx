import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import PostWidgetProfile from "./PostWidgetProfile";

const PostsWidget = ({ userId, isProfile = false, searchQuery }) => {
  const dispatch = useDispatch();

  // Get all posts from the Redux store
  const allPosts = useSelector((state) => state.posts);

  // State to hold the filtered posts
  const [posts, setPostsState] = useState(allPosts);

  // Get the token from the Redux store
  const token = useSelector((state) => state.token);

  // Function to fetch all posts
  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setPostsState(data);
  };

  // Function to fetch user-specific posts
  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setPostsState(data);
  };

  useEffect(() => {
    // Fetch the posts based on the widget type (profile or all posts)
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  useEffect(() => {
    // Filter posts based on search query
    if (searchQuery) {
      const filteredPosts = allPosts.filter((post) =>
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setPostsState(filteredPosts);
    } else {
      setPostsState(allPosts);
    }
  }, [allPosts, searchQuery]);

  // Render PostWidgetProfile if it's a profile widget, otherwise render PostWidget
  if (isProfile) {
    return (
      <>
        {Array.isArray(posts) && posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            title,
            description,
            category,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidgetProfile
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              title={title}
              description={description}
              category={category}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
      </>
    );
  } else {
    return (
      <>
        {Array.isArray(posts) && posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            title,
            description,
            category,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              title={title}
              description={description}
              category={category}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
      </>
    );
  }
};

export default PostsWidget;
