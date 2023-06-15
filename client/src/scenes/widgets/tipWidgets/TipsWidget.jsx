import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTips, setSearchQuery } from "state";
import TipWidget from "./TipWidget";

const TipsWidget = ({ userId, isProfile = false }) => {
  // Import necessary hooks and components
  const dispatch = useDispatch(); // Hook for dispatching actions to Redux store
  const token = useSelector((state) => state.token); // Access token from Redux store

  // Set up component state using useState hook
  const [tips, setTipsState] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch all tips from the server
  const getTips = async () => {
    try {
      // Send GET request to the server to fetch tips
      const response = await fetch("http://localhost:3001/tips", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      // Parse the response as JSON
      const data = await response.json();

      // Reverse the order of tips and update Redux store and component state
      const reversedData = data.reverse();
      dispatch(setTips({ tips: reversedData }));
      setTipsState(reversedData);
    } catch (error) {
      console.error("Failed to fetch tips:", error);
    }
  };

  // Function to fetch tips for a specific user from the server
  const getUserTips = async () => {
    try {
      // Send GET request to the server to fetch user-specific tips
      const response = await fetch(
        `http://localhost:3001/tips/${userId}/tips`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();

      // Reverse the order of tips and update Redux store and component state
      const reversedData = data.reverse();
      dispatch(setTips({ tips: reversedData }));
      setTipsState(reversedData);
    } catch (error) {
      console.error("Failed to fetch user tips:", error);
    }
  };

  // useEffect hook to fetch data when the component mounts or dependencies change
  useEffect(() => {
    if (isProfile) {
      // If the component is in profile mode, fetch user-specific tips
      getUserTips();
    } else {
      // Otherwise, fetch all tips
      getTips();
    }
  }, [isProfile, userId]); // Include isProfile and userId as dependencies

  if (!tips) {
    // Render a loading state while fetching data
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "15px",
          marginTop: "4rem",
        }}
      >
        Loading...
      </div>
    );
  }

  // Render the tips if available
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
            />
          )
        )}
    </>
  );
}

export default TipsWidget;
