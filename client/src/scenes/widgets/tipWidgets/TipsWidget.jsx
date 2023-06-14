import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTips, setCategory, setSearchQuery } from "state";
import TipWidget from "./TipWidget";

const TipsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const allTips = useSelector((state) => state.tips);
  const category = useSelector((state) => state.category);
  const searchQuery = useSelector((state) => state.searchQuery);
  const [tips, setTipsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.token);

  const getTips = async () => {
    try {
      dispatch(setCategory({ category: null })); // Reset category filter
      dispatch(setSearchQuery({ searchQuery: "" })); // Reset search query
      const response = await fetch("http://localhost:3001/tips", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setTips({ tips: data }));
      setTipsState(data);
    } catch (error) {
      console.error("Failed to fetch tips:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserTips = async () => {
    try {
      dispatch(setSearchQuery({ searchQuery: "" })); // Reset search query
      const response = await fetch(
        `http://localhost:3001/tips/${userId}/tips`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setTips({ tips: data }));
      setTipsState(data);
    } catch (error) {
      console.error("Failed to fetch user tips:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true); // Set loading state to true before fetching data

    if (isProfile) {
      getUserTips();
    } else {
      getTips();
    }
  }, [isProfile, userId]); // Include isProfile and userId as dependencies

  useEffect(() => {
    let filteredTips = allTips;

    if (searchQuery) {
      filteredTips = filteredTips.filter(
        (tip) =>
          tip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tip.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category) {
      filteredTips = filteredTips.filter((tip) => tip.category === category);
    }

    setTipsState(filteredTips);
  }, [searchQuery, category, allTips]);

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while fetching data
  }

  if (!isProfile) 
  {
    return (
      <>
        {Array.isArray(tips) &&
          tips.map(
            // Render the tips
            ({
              _id,
              userId,
              firstName,
              lastName,
              title,
              description,
              category,
              location,
              videoPath,
              userPicturePath,
              likes,
              comments,
            }) => (
              <TipWidget
                key={_id}
                tipId={_id}
                tipUserId={userId}
                name={`${firstName} ${lastName}`}
                title={title}
                description={description}
                category={category}
                location={location}
                videoPath={videoPath}
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

export default TipsWidget;
