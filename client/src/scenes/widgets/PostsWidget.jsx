import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setCategory } from "state";
import PostWidget from "./PostWidget";
import PostWidgetProfile from "./PostWidgetProfile";

const PostsWidget = ({ userId, isProfile = false, searchQuery }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);
  const categorie = useSelector((state) => state.category);
  const [posts, setPostsState] = useState(allPosts);
  const [category, setCategoryState] = useState(null);
  const token = useSelector((state) => state.token);


  console.log(categorie);


  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    dispatch(setCategory({category: null}));
    setPostsState(data);
  };

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
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    } 
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
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
  }, [categorie, searchQuery]);

useEffect(() => {
    if (categorie) {
      setCategoryState(categorie);
      const filtered = allPosts.filter((post) => post.category === categorie);
      dispatch(setCategory({ category: categorie }));
      console.log("filtrate");
      console.log(filtered);
      setPostsState(filtered);
      setCategoryState(null);}

      else {
        setPostsState(allPosts);
  } }, [categorie]);

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